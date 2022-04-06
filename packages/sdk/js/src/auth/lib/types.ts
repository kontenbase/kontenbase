interface AuthResponseBase {
  status: number;
  statusText: string;
}

export interface AuthError {
  message: string;
}

export interface AuthResponseFailure extends AuthResponseBase {
  error?: AuthError;
  user?: null;
  token?: null;
}

export interface AuthResponseSuccess<T> extends AuthResponseBase {
  error?: AuthError;
  user: T;
  token: string;
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

export type LookupGetId<T> = {
  _id: Array<keyof Partial<T>> | '*';
};

export type GetUserOption<T> = {
  lookup?: Array<keyof Partial<T>> | '*' | LookupGetId<T>;
};
