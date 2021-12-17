import axios from 'axios';
import qs from 'qs';
import {
  KontenbaseResponse,
  KontenbaseResponseFailure,
  KontenbaseSingleResponse,
  FindOption,
  QueryClientOption,
} from './lib/types';

export default class QueryClient<T> {
  protected url: string;
  protected headers: { [key: string]: string };

  constructor(url: string, options: QueryClientOption) {
    this.url = url;
    this.headers = { ...options.headers };
  }

  private _error(error: any): KontenbaseResponseFailure {
    if (axios.isAxiosError(error) && error.response) {
      return {
        message:
          typeof error.response.data === 'object'
            ? JSON.stringify(error.response.data)
            : String(error.response.data),
        status: error.response.status,
        statusText: error.response.statusText,
      };
    }

    return {
      message: 'Failed',
      status: 500,
      statusText: 'FAILED',
    };
  }

  private _filter(find?: FindOption): string {
    let query = '';
    if (find) {
      let filter: any = {};
      if (find.skip) {
        filter['$skip'] = find.skip;
        delete find.skip;
      }
      if (find.limit) {
        filter['$limit'] = find.limit;
        delete find.limit;
      }

      if (find.sort) {
        filter['$sort'] = find.sort;
        delete find.sort;
      }

      if (find.where) {
        filter = {
          ...filter,
          ...find.where,
        };
      }

      query = qs.stringify(filter, { encode: false });
    }
    return query;
  }

  async find(find?: FindOption): Promise<KontenbaseResponse<T>> {
    return new Promise(async (resove, reject) => {
      try {
        const query = this._filter(find);
        const { data, status, statusText, headers } = await axios.get<T[]>(
          `${this.url}${query ? '?' + query : ''}`,
          {
            headers: this.headers,
          },
        );

        resove({
          data,
          status,
          statusText,
          count: Number(headers['x-total-count']),
          limit: Number(headers['x-pagination-limit']),
          skip: Number(headers['x-pagination-skip']),
        });
      } catch (error) {
        reject(this._error(error));
      }
    });
  }

  async findById(id: string): Promise<KontenbaseSingleResponse<T>> {
    return new Promise(async (resolve, reject) => {
      try {
        const { data, status, statusText } = await axios.get<T>(
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
        reject(this._error(error));
      }
    });
  }

  async create(body: Partial<T>): Promise<KontenbaseSingleResponse<T>> {
    return new Promise(async (resolve, reject) => {
      try {
        const { data, status, statusText } = await axios.post<T>(
          this.url,
          body,
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
        return reject(this._error(error));
      }
    });
  }

  async updateById(
    id: string,
    body: Partial<T>,
  ): Promise<KontenbaseSingleResponse<T>> {
    return new Promise(async (resolve, reject) => {
      try {
        const { data, status, statusText } = await axios.patch<T>(
          `${this.url}/${id}`,
          body,
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
        reject(this._error(error));
      }
    });
  }

  async deleteById(id: string): Promise<KontenbaseSingleResponse<T>> {
    return new Promise(async (resolve, reject) => {
      try {
        const { data, status, statusText } = await axios.delete<T>(
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
        reject(this._error(error));
      }
    });
  }
}
