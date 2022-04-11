export interface RealtimeClientOption {
  url: string;
  apiKey: string;
}

export type RealtimeEventTypes =
  | 'CREATE_RECORD'
  | 'UPDATE_RECORD'
  | 'DELETE_RECORD'
  | 'LINK_RECORD'
  | 'UNLINK_RECORD'
  | '*';

interface ErrorMessage {
  message: string;
}

export interface RealtimeMessage {
  event: 'CREATE_RECORD' | 'UPDATE_RECORD' | 'DELETE_RECORD' | 'LINK_RECORD' | 'UNLINK_RECORD' | 'ERROR';
  payload?: any;
  error?: ErrorMessage;
  key?: string;
}

export type RealtimeCallback = (m: RealtimeMessage) => any;

export type SubscribeOption<T> = {
  event: RealtimeEventTypes;
  where?: Partial<T>;
  token?: string | null;
};
