import axios from 'axios';
import {
  StorageResponseFailure,
  StorageSingleResponse,
  Storage,
} from './lib/types';
import FormData from 'isomorphic-form-data';
import { AuthClient } from '../auth';

export default class StorageClient {
  protected url: string;
  protected auth: AuthClient;

  constructor(url: string, auth: AuthClient) {
    this.url = url;
    this.auth = auth;
  }

  private _error(error: any): StorageResponseFailure {
    if (axios.isAxiosError(error) && error.response) {
      return {
        error: {
          message: error.response.data?.message
            ? error.response.data.message
            : typeof error.response.data === 'object'
            ? JSON.stringify(error.response.data)
            : String(error.response.data),
        },
        status: error.response.status,
        statusText: error.response.statusText,
      };
    }

    return {
      error: {
        message: 'Failed',
      },
      status: 500,
      statusText: 'FAILED',
    };
  }

  private _getHeaders(): { [key: string]: string } {
    const headers: { [key: string]: string } = {};
    const authBearer = this.auth.token();
    if (authBearer && authBearer !== '') {
      headers['Authorization'] = `Bearer ${authBearer}`;
    }
    return headers;
  }

  async upload(
    file:
      | ArrayBuffer
      | ArrayBufferView
      | Blob
      | Buffer
      | File
      | NodeJS.ReadableStream
      | ReadableStream<Uint8Array>
      | URLSearchParams
      | string,
  ): Promise<StorageSingleResponse> {
    return new Promise(async (resolve, _reject) => {
      try {
        const form = new FormData();
        form.append('file', file);
        let formHeaders = {};
        if (typeof form.getHeaders == 'function') {
          formHeaders = form.getHeaders();
        }
        const { data, status, statusText } = await axios.post<Storage>(
          this.url + '/upload',
          form,
          {
            headers: {
              ...formHeaders,
              ...this._getHeaders(),
            },
          },
        );

        resolve({
          data,
          status,
          statusText,
        });
      } catch (error) {
        return resolve(this._error(error));
      }
    });
  }
}
