import { IErrorResponse } from './types';

export default function throwError(message: string, code: number = 500) {
  const error: IErrorResponse = new Error(message);
  error.code = code;
  throw error;
}
