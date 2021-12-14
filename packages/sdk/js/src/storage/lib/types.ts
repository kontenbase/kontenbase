export interface Storage {
  fileName: string;
  mimeType: string;
  size: number;
  url: string;
}

interface StorageResponseBase {
  status: number;
  statusText: string;
}

export interface StorageResponseFailure extends StorageResponseBase {
  message?: string;
  data?: null;
}

export interface StorageSingleResponseSuccess extends StorageResponseBase {
  data: Storage;
  error?: null;
}

export type StorageSingleResponse =
  | StorageSingleResponseSuccess
  | StorageResponseFailure;
