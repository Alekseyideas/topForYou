import { Request, Response } from 'express';

export interface IErrorResponse extends Error {
  code?: number;
}

export interface IContext {
  req: Request;
  res: Response;
  payload?: {
    id: number;
    role: number;
  };
}
