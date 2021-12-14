import { AuthClient } from '../../auth';
import { RealtimeClient, RealtimeCallback } from '../../realtime';

export default class Realtime {
  private _realtime: RealtimeClient;
  private _auth: AuthClient;

  constructor(realtime: RealtimeClient, auth: AuthClient) {
    this._realtime = realtime;
    this._auth = auth;
  }

  subscribe(name: string, callback: RealtimeCallback) {
    return this._realtime.subscribe(
      {
        name: name,
        token: this._auth.token(),
      },
      callback,
    );
  }

  unsubscribe(key: string): boolean {
    return this._realtime.unsubscribe(key);
  }
}
