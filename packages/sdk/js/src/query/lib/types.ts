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

export enum Sort {
  ASC = 1,
  DESC = -1,
}

export type Where<T> =
  | Partial<T>
  | {
      [P in keyof Partial<T> | string]:
        | {
            ['$in']?: [string | number | boolean];
          }
        | {
            ['$nin']?: [string | number | boolean];
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
          };
    };

export interface FindOption<T> {
  limit?: number;
  skip?: number;
  where?: Where<T>;
  sort?: { [P in keyof Partial<T>]: Sort | number };
  select?: [keyof Partial<T>];
  lookup?: [keyof Partial<T>];
  or?: [Where<T>];
}

export interface QueryClientOption {
  headers?: { [key: string]: string };
}
