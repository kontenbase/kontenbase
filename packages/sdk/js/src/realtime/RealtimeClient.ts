import axios from 'axios';
import qs from 'qs';
import {
  RealtimeClientOption,
  RealtimeCallback,
  SubscribeOption,
} from './lib/types';

const Centrifuge = require('centrifuge');
const WebSocket = require('isomorphic-ws');

export default class RealtimeClient {
  protected option: RealtimeClientOption;
  protected isBrowser = typeof window !== 'undefined';
  subcriptions = new Map();

  constructor(option: RealtimeClientOption) {
    this.option = option;
  }

  _centrifuge(token: string | null | undefined) {
    const url = `${this.option.url.replace('http', 'ws')}/connection/${
      this.option.apiKey
    }/websocket${token ? `?token=${token}` : ''}`;
    return new Centrifuge(url, {
      websocket: this.isBrowser ? null : WebSocket,
    });
  }

  subscribe<T>(
    name: string,
    { token, event, where }: SubscribeOption<T>,
    callback: RealtimeCallback,
  ): Promise<string> {
    return new Promise<string>(async (resolve, reject) => {
      try {
        let key = `${name.toLowerCase().replace(' ', '-')}-${String(
          new Date().getTime(),
        )}`;

        const lastSubscribe = this.subcriptions.get(name);

        if (lastSubscribe) {
          lastSubscribe.unsubscribe();
        }

        const getChannel = await axios.get(
          `${this.option.url}/channel/${this.option.apiKey}/${name}`,
        );

        let filter = '';

        if (where) {
          filter = ':' + qs.stringify(where, { encode: false });
        }

        const channel = `${getChannel.data.name}:${event || '*'}${filter}`;
        const centrifuge = this._centrifuge(token);

        const subscribe = centrifuge.subscribe(
          channel,
          function (message: any) {
            callback?.({
              key,
              event: message.result.data.data.eventType,
              payload: message.result.data.data.payload,
            });
          },
        );
        subscribe.on('error', function (err: any) {
          callback?.({
            key,
            event: 'ERROR',
            error: {
              message: err.message,
            },
          });
        });
        centrifuge.connect();

        this.subcriptions.set(key, centrifuge);

        resolve(key);
      } catch (error) {
        reject(error);
      }
    });
  }

  unsubscribe(key: string): boolean {
    const subscription = this.subcriptions.get(key);
    if (subscription) {
      subscription.disconnect();
      this.subcriptions.delete(key);
    }

    return subscription ? true : false;
  }
}
