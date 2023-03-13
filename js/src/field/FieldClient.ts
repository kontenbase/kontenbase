import axios from 'axios';
import {
  Field,
  FieldClientOption,
  FieldResponse,
  FieldResponseFailure,
  FieldSingleResponse,
} from './lib/types';

export default class FieldClient<T> {
  protected url: string;
  protected headers: { [key: string]: string };

  constructor(url: string, options: FieldClientOption) {
    this.url = `${url}/fields`;
    this.headers = { ...options.headers };
  }

  private _error(error: any): FieldResponseFailure {
    if (axios.isAxiosError(error) && error.response) {
      return {
        error: {
          message: (error.response.data as any)?.message
            ? (error.response.data as any).message
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

  async find(): Promise<FieldResponse<T>> {
    return new Promise(async (resolve, _reject) => {
      try {
        const { data, status, statusText } = await axios.get<Field<T>[]>(
          this.url,
          {
            headers: this.headers,
          },
        );

        resolve({
          data,
          status,
          statusText,
        });
      } catch (error) {
        resolve(this._error(error));
      }
    });
  }

  async getById(id: string): Promise<FieldSingleResponse<T>> {
    return new Promise(async (resolve, _reject) => {
      try {
        const { data, status, statusText } = await axios.get<Field<T>>(
          `${this.url}/${id}`,
          {
            headers: this.headers,
          },
        );

        resolve({
          data,
          status,
          statusText,
        });
      } catch (error) {
        resolve(this._error(error));
      }
    });
  }
}
