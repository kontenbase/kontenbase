interface AuthResponseBase {
  status: number;
  statusText: string;
}

export interface AuthResponseFailure extends AuthResponseBase {
  message?: string;
  user?: null;
}

export interface AuthResponseSuccess<T> extends AuthResponseBase {
  error?: null;
  user: T;
}

export type AuthResponse<T> = AuthResponseSuccess<T> | AuthResponseFailure;

export interface TokenResponse<T> {
  token: string;
  user: T;
}

export interface ProfileResponseSuccess<T> extends AuthResponseBase {
  error?: null;
  user?: T;
}

export type ProfileResponse<T> =
  | ProfileResponseSuccess<T>
  | AuthResponseFailure;
