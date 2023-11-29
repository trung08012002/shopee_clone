export interface ResponseApi<Data> {
  message: string;
  data: Data;
}

export interface ErrorResponse<Data> {
  message: string;
  data?: Data;
}

export type NoUndefinedField<T> = {
  [p in keyof T]-?: NoUndefinedField<NonNullable<T[p]>>;
};
