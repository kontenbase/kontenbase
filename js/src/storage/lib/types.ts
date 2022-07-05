export interface Storage {
  id: string;
  fileName: string;
  mimeType: string;
  size: number;
  url: string;
}

interface StorageResponseBase {
  status: number;
  statusText: string;
}

export interface StorageError {
  message: string;
}
export interface StorageResponseFailure extends StorageResponseBase {
  error?: StorageError;
  data?: null;
}

export interface StorageSingleResponseSuccess extends StorageResponseBase {
  data: Storage;
  error?: StorageError;
}

export type StorageSingleResponse =
  | StorageSingleResponseSuccess
  | StorageResponseFailure;
