import URL from 'url-parse';
import { parseDomain, fromUrl, ParseResultListed } from 'parse-domain';
import { QueryClient } from '..';
import { AuthClient } from '../auth';
import { RealtimeClient } from '../realtime';
import { StorageClient } from '../storage';
import Realtime from './lib/Realtime';
import { KontenbaseClientOptions } from './lib/types';

export default class KontenbaseClient {
  auth: AuthClient;
  realtime: Realtime;
  storage: StorageClient;

  protected _realtimeClient: RealtimeClient;
  protected apiKey: string;
  protected queryUrl: string;
  protected realtimeUrl: string;
  protected headers: { [key: string]: string };

  constructor(options: KontenbaseClientOptions) {
    if (!options?.apiKey) throw new Error('apiKey is required');

    let url = 'https://api.kontenbase.com';
    let queryUrl = `${url}/query/api/v1/${options.apiKey}`;

    if (options.url) {
      const { origin } = new URL(options.url);

      if (origin !== url) {
        const isDedicated = !origin.includes('api');

        if (isDedicated) {
          const { subDomains, domain } = parseDomain(
            fromUrl(origin),
          ) as ParseResultListed;

          subDomains.splice(0, 1, 'api');
          url = `https://${subDomains.join('.')}.${domain}.com`;
        } else {
          url = origin;
        }

        queryUrl = `${origin}${isDedicated ? '' : '/query'}/api/v1/${
          options.apiKey
        }`;
      }
    }

    this.queryUrl = queryUrl;
    this.realtimeUrl = `${url}/stream`;
    this.apiKey = options.apiKey;
    this.headers = {};
    this.auth = this._initAuth();
    this._realtimeClient = this._initRealtime();

    this.realtime = new Realtime(this._realtimeClient, this.auth);
    this.storage = new StorageClient(`${this.queryUrl}/storage`, this.auth);
  }

  private _getHeaders(): { [key: string]: string } {
    const headers: { [key: string]: string } = this.headers;
    const authBearer = this.auth.token();
    if (authBearer && authBearer !== '') {
      headers['Authorization'] = `Bearer ${authBearer}`;
    }
    return headers;
  }

  private _initAuth() {
    return new AuthClient(this.queryUrl, {
      headers: this.headers,
    });
  }

  private _initRealtime() {
    return new RealtimeClient({
      url: this.realtimeUrl,
      apiKey: this.apiKey,
    });
  }

  service<T = any>(name: string): QueryClient<T> {
    return new QueryClient<T>(`${this.queryUrl}/${name}`, {
      headers: this._getHeaders(),
    });
  }
}
