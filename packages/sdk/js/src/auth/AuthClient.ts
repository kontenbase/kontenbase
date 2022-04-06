import axios from 'axios';
import qs from 'qs';
import { STORAGE_KEY } from './lib/constants';
import { isBrowser } from './lib/helpers';
import {
  AuthResponseFailure,
  AuthResponse,
  ProfileResponse,
  TokenResponse,
  GetUserOption,
} from './lib/types';

export default class AuthClient {
  protected url: string;
  protected headers: { [key: string]: string };
  protected currentToken: string | null;

  constructor(
    url: string,
    { headers = {} }: { headers?: { [key: string]: string } } = {},
  ) {
    this.url = url;
    this.headers = { ...headers };
    this.currentToken = null;

    this._initToken();
  }

  private _error(error: any): AuthResponseFailure {
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

  private _filter<T = any>(option?: GetUserOption<T>): string {
    let query = '';
    if (option) {
      let filter: any = {};

      if (option.lookup) {
        filter['$lookup'] = option.lookup;
        delete option.lookup;
      }

      query = qs.stringify(filter, { encode: false });
    }
    return query;
  }

  async login<T = any>(body: {
    email: string;
    password: string;
  }): Promise<AuthResponse<T>> {
    return new Promise(async (resolve, _reject) => {
      try {
        const { data, status, statusText } = await axios.post<TokenResponse<T>>(
          `${this.url}/auth/login`,
          body,
        );
        this.saveToken(data.token);

        const user = data.user;
        resolve({
          user,
          status,
          statusText,
          token: data.token,
        });
      } catch (error) {
        resolve(this._error(error));
      }
    });
  }

  async register<T = any>(body: Partial<T>): Promise<AuthResponse<T>> {
    return new Promise(async (resolve, _reject) => {
      try {
        const { data, status, statusText } = await axios.post<TokenResponse<T>>(
          `${this.url}/auth/register`,
          body,
        );
        this.saveToken(data.token);

        const user = data.user;
        resolve({
          user,
          status,
          statusText,
          token: data.token,
        });
      } catch (error) {
        resolve(this._error(error));
      }
    });
  }

  async user<T = any>(option?: GetUserOption<T>): Promise<ProfileResponse<T>> {
    return new Promise(async (resolve, _reject) => {
      try {
        const query = this._filter(option);
        const { data, status, statusText } = await axios.get<T>(
          `${this.url}/auth/user${query ? '?' + query : ''}`,
          {
            headers: this._headers(),
          },
        );

        const user = data;
        resolve({
          user,
          status,
          statusText,
        });
      } catch (error) {
        resolve(this._error(error));
      }
    });
  }

  async update<T = any>(body: Partial<T>): Promise<ProfileResponse<T>> {
    return new Promise(async (resolve, _reject) => {
      try {
        const { data, status, statusText } = await axios.patch<T>(
          `${this.url}/auth/user`,
          body,
          {
            headers: this._headers(),
          },
        );

        const user = data;
        resolve({
          user,
          status,
          statusText,
        });
      } catch (error) {
        resolve(this._error(error));
      }
    });
  }

  token() {
    return this.currentToken;
  }

  private _headers() {
    const headers: { [key: string]: string } = this.headers;
    const authBearer = this.token();
    if (authBearer && authBearer !== '') {
      headers['Authorization'] = `Bearer ${authBearer}`;
    }
    return headers;
  }

  saveToken(token: string) {
    this.currentToken = token;
    this._setToken(token);
  }

  async logout<T = any>(): Promise<AuthResponse<T>> {
    return new Promise(async (resolve, _reject) => {
      try {
        const { data, status, statusText } = await axios.post<TokenResponse<T>>(
          `${this.url}/auth/logout`,
          null,
          {
            headers: this._headers(),
          },
        );

        this._removeToken();
        const user = data.user;
        resolve({
          user,
          status,
          statusText,
          token: data.token,
        });
      } catch (error) {
        resolve(this._error(error));
      }
    });
  }

  private _setToken(token: string) {
    if (isBrowser()) {
      window.localStorage.setItem(STORAGE_KEY, token);
    }
  }

  private _removeToken() {
    this.currentToken = null;
    if (isBrowser()) {
      window.localStorage.removeItem(STORAGE_KEY);
    }
  }

  private _initToken() {
    if (isBrowser()) {
      const token = window.localStorage.getItem(STORAGE_KEY);
      if (token) {
        this.currentToken = token;
      }
    }
  }
}
