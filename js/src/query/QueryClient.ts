import axios from 'axios';
import qs from 'qs';
import {
  KontenbaseResponse,
  KontenbaseResponseFailure,
  KontenbaseSingleResponse,
  FindOption,
  QueryClientOption,
  KontenbaseCount,
  KontenbaseResponseCount,
  CountOption,
  GetByIdOption,
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

  private _filter(option?: FindOption<T>): string {
    let query = '';
    if (option) {
      let filter: any = {};
      if (option.skip) {
        filter['$skip'] = option.skip;
        delete option.skip;
      }

      if (option.limit) {
        filter['$limit'] = option.limit;
        delete option.limit;
      }

      if (option.sort) {
        filter['$sort'] = option.sort;
        delete option.sort;
      }

      if (option.select) {
        filter['$select'] = option.select;
        delete option.select;
      }

      if (option.lookup) {
        filter['$lookup'] = option.lookup;
        delete option.lookup;
      }

      if (option.or) {
        filter['$or'] = option.or;
        delete option.or;
      }

      if (option.where) {
        filter = {
          ...filter,
          ...option.where,
        };
      }

      query = qs.stringify(filter, { encode: false });
    }
    return query;
  }

  async find(option?: FindOption<T>): Promise<KontenbaseResponse<T>> {
    return new Promise(async (resolve, _reject) => {
      try {
        const query = this._filter(option);
        const { data, status, statusText, headers } = await axios.get<T[]>(
          `${this.url}${query ? '?' + query : ''}`,
          {
            headers: this.headers,
          },
        );

        resolve({
          data,
          status,
          statusText,
          limit: Number(headers['x-pagination-limit']),
          skip: Number(headers['x-pagination-skip']),
        });
      } catch (error) {
        resolve(this._error(error));
      }
    });
  }

  async getById(
    id: string,
    option?: GetByIdOption<T>,
  ): Promise<KontenbaseSingleResponse<T>> {
    return new Promise(async (resolve, _reject) => {
      try {
        const query = this._filter(option);
        const { data, status, statusText } = await axios.get<T>(
          `${this.url}/${id}${query ? '?' + query : ''}`,
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

  async create(body: Partial<T>): Promise<KontenbaseSingleResponse<T>> {
    return new Promise(async (resolve, _reject) => {
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
        resolve(this._error(error));
      }
    });
  }

  async updateById(
    id: string,
    body: Partial<T>,
  ): Promise<KontenbaseSingleResponse<T>> {
    return new Promise(async (resolve, _reject) => {
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
        resolve(this._error(error));
      }
    });
  }

  async deleteById(id: string): Promise<KontenbaseSingleResponse<T>> {
    return new Promise(async (resolve, _reject) => {
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
        resolve(this._error(error));
      }
    });
  }

  async link(
    id: string,
    body: { [key: string]: string },
  ): Promise<KontenbaseSingleResponse<T>> {
    return new Promise(async (resolve, _reject) => {
      try {
        const { data, status, statusText } = await axios.request<T>({
          method: 'LINK',
          url: `${this.url}/${id}`,
          headers: this.headers,
          data: body,
        });

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

  async unlink(
    id: string,
    body: { [key: string]: string },
  ): Promise<KontenbaseSingleResponse<T>> {
    return new Promise(async (resolve, _reject) => {
      try {
        const { data, status, statusText } = await axios.request<T>({
          method: 'UNLINK',
          url: `${this.url}/${id}`,
          headers: this.headers,
          data: body,
        });

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

  async count(option?: CountOption<T>): Promise<KontenbaseResponseCount> {
    return new Promise(async (resolve, _reject) => {
      try {
        const query = this._filter(option);
        const { data, status, statusText } = await axios.get<KontenbaseCount>(
          `${this.url}/count${query ? '?' + query : ''}`,
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

  async fields(): Promise<KontenbaseResponse<T>> {
    return new Promise(async (resolve, _reject) => {
      try {
        const { data, status, statusText } = await axios.get<T[]>(
          `${this.url}/fields`,
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
