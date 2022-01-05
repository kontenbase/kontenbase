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
    if (!options?.apiKey) throw new Error('apiKey is required.');

    const url = options.url ? options.url : 'https://api.kontenbase.com';

    this.queryUrl = `${url}/query/api/v1/${options.apiKey}`;
    this.realtimeUrl = `${url}/stream`;
    this.apiKey = options.apiKey;
    this.headers = {};
    this.auth = this._initAuth();
    this._realtimeClient = this._initRealtime();

    this.realtime = new Realtime(this._realtimeClient, this.auth);
    this.storage = new StorageClient(`${this.queryUrl}/upload`, this.auth);
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
