interface KontenbaseResponseBase {
  status: number;
  statusText: string;
}

export interface KontenbaseResponseSuccess<T> extends KontenbaseResponseBase {
  data?: T[];
  count?: number | null;
  skip?: number | null;
  limit?: number | null;
}

export interface KontenbaseResponseFailure extends KontenbaseResponseBase {
  message?: string;
  data?: null;
}

export type KontenbaseResponse<T> =
  | KontenbaseResponseSuccess<T>
  | KontenbaseResponseFailure;

export interface KontenbaseSingleResponseSuccess<T>
  extends KontenbaseResponseBase {
  data?: T;
  error?: null;
}

export type KontenbaseSingleResponse<T> =
  | KontenbaseSingleResponseSuccess<T>
  | KontenbaseResponseFailure;

export interface FindOption {
  limit?: number;
  skip?: number;
  where?: any;
}

export interface QueryClientOption {
  headers?: { [key: string]: string };
}
