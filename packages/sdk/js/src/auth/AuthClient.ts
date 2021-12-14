import axios from 'axios';
import { STORAGE_KEY } from './lib/constants';
import { isBrowser } from './lib/helpers';
import { AuthResponseFailure, AuthSingleResponse } from './lib/types';

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
        message:
          typeof error.response.data === 'object'
            ? error.response.data.message
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

  async login<T = any>(body: {
    email: string;
    password: string;
  }): Promise<AuthSingleResponse<T>> {
    return new Promise(async (resolve, reject) => {
      try {
        const { data, status, statusText } = await axios.post(
          `${this.url}/login`,
          body,
        );
        this.saveToken(data.token);
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

  async register<T = any>(body: Partial<T>): Promise<AuthSingleResponse<T>> {
    return new Promise(async (resolve, reject) => {
      try {
        const { data, status, statusText } = await axios.post(
          `${this.url}/register`,
          body,
        );
        this.saveToken(data.token);
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

  async profile<T = any>(): Promise<AuthSingleResponse<T>> {
    return new Promise(async (resolve, reject) => {
      try {
        const { data, status, statusText } = await axios.get(
          `${this.url}/profile`,
          {
            headers: this._headers(),
          },
        );
        this.currentToken = data.token;
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

  logout() {
    this.currentToken = null;
    this._removeToken();
  }

  private _setToken(token: string) {
    if (isBrowser()) {
      window.localStorage.setItem(STORAGE_KEY, token);
    }
  }

  private _removeToken() {
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
