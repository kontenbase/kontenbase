interface KontenbaseResponseBase {
  status: number;
  statusText: string;
}

interface KontenbaseError {
  message: string;
}

interface KontenbaseResponseSuccess<T> extends KontenbaseResponseBase {
  data?: T[];
  error?: null;
}

export interface KontenbaseResponseFailure extends KontenbaseResponseBase {
  data?: null;
  error?: KontenbaseError;
}

interface Pagination {
  limit?: number | null;
  skip?: number | null;
}

export type KontenbaseResponse<T> = (
  | KontenbaseResponseSuccess<T>
  | KontenbaseResponseFailure
) &
  Pagination;

interface KontenbaseSingleResponseSuccess<T> extends KontenbaseResponseBase {
  data?: T;
  error?: null;
}

export type KontenbaseSingleResponse<T> =
  | KontenbaseSingleResponseSuccess<T>
  | KontenbaseResponseFailure;

type FieldLookup<T> = {
  [P in keyof Partial<T> | string]:
    | {
        ['$lookup']: Lookup<Record<string, unknown>>;
      }
    | '*';
};

export type Lookup<T> = {
  '*'?: Array<FieldLookup<T> | keyof T>;
  _id?: Array<FieldLookup<T> | keyof T | '*'>;
};

type Where<T> =
  | Partial<T>
  | {
      [P in keyof Partial<T> | string]:
        | {
            ['$in']?: (string | number | boolean)[];
          }
        | {
            ['$nin']?: (string | number | boolean)[];
          }
        | {
            ['$ne']?: string | number | boolean;
          }
        | {
            ['$contains']?: string | number | boolean;
          }
        | {
            ['$notContains']?: string | number | boolean;
          }
        | {
            ['$lt']?: number;
          }
        | {
            ['$lte']?: number;
          }
        | {
            ['$gt']?: number;
          }
        | {
            ['$gte']?: number;
          }
        | {
            ['isEmpty']?: boolean;
          }
        | {
            ['isNotEmpty']?: boolean;
          };
    };

export type FindOption<T> = {
  limit?: number;
  skip?: number;
  where?: Where<T>;
  sort?: { [P in keyof Partial<T>]: 1 | -1 }[];
  select?: Array<keyof Partial<T>>;
  lookup?: Array<keyof Partial<T>> | '*' | Lookup<T>;
  or?: Array<Where<T>>;
};

export type CountOption<T> = {
  where?: Where<T>;
  or?: Array<Where<T>>;
};

export type GetByIdOption<T> = {
  select?: Array<keyof Partial<T>>;
  lookup?: Array<keyof Partial<T>> | '*' | Lookup<T>;
};

export interface QueryClientOption {
  url: string;
  headers?: { [key: string]: string };
}

export interface KontenbaseCount {
  count: number;
}

export interface KontenbaseResponseSuccessCount extends KontenbaseResponseBase {
  data?: KontenbaseCount;
  error?: null;
}

export type KontenbaseResponseCount =
  | KontenbaseResponseSuccessCount
  | KontenbaseResponseFailure;
