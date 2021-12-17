interface AuthResponseBase {
  status: number;
  statusText: string;
}

export interface AuthResponseFailure extends AuthResponseBase {
  message?: string;
  data?: null;
}

export interface AuthResponseSuccess<T> extends AuthResponseBase {
  data?: Session;
  error?: null;
}

export type AuthResponse<T> = AuthResponseSuccess<T> | AuthResponseFailure;

export interface Session {
  token: string;
}

export interface ProfileResponseSuccess<T> extends AuthResponseBase {
  data?: T;
  error?: null;
}

export type ProfileResponse<T> =
  | ProfileResponseSuccess<T>
  | AuthResponseFailure;
