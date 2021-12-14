interface AuthResponseBase {
  status: number;
  statusText: string;
}

export interface AuthResponseFailure extends AuthResponseBase {
  message?: string;
  data?: null;
}

export interface AuthSingleResponseSuccess<T> extends AuthResponseBase {
  data?: Session;
  error?: null;
}

export type AuthSingleResponse<T> =
  | AuthSingleResponseSuccess<T>
  | AuthResponseFailure;

export interface Session {
  token: string;
}
