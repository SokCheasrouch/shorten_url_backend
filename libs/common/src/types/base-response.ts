export type BaseResponse<T> = {
  data: T;
  code: number;
  key: string;
  message: string;
  details?: string;
};
