export interface Field<T> {
  id: string;
  name: string;
  tableId: string;
  projectId: string;
  type: string;
  options: T;
  isLockedBySystem: boolean;
  isRequired: boolean;
  isUnique: boolean;
  defaultValue: T;
}

export interface FieldOptions<T> {
  type: string;
  typeOptions: { [key: string]: T };
  isRequired?: boolean
  isUnique?: boolean
  defaultValue?: T;
}

interface FieldResponseBase {
  status: number;
  statusText: string;
}

interface FieldError {
  message: string;
}

export interface FieldResponseSuccess<T> extends FieldResponseBase {
  data?: Field<T>[];
  error?: null;
}

export interface FieldResponseFailure extends FieldResponseBase {
  data?: null;
  error?: FieldError;
}

export type FieldResponse<T> = 
  | FieldResponseSuccess<T>
  | FieldResponseFailure;

export interface FieldSingleResponseSuccess<T> extends FieldResponseBase {
  data?: Field<T>;
  error?: null;
}

export type FieldSingleResponse<T> = 
  | FieldSingleResponseSuccess<T>
  | FieldResponseFailure;
