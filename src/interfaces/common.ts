import { NextFunction, Request, Response } from 'express';
import { ZodError } from 'zod';

import { IApplicationError } from '../models/common/interfaces.js';
import { LoggedUser } from '../services/authorization/interfaces.js';

export enum ApplicationErrors {
  SERVER_ERROR = 'INTERNAL SERVER ERROR',
  VALIDATION_ERROR = 'VALIDATION FAILED',
}

export enum ResponseStatus {
  SUCCESS = 'success',
  WARNING = 'warning',
  ERROR = 'error',
}

export interface ResponseLocals {
  user: LoggedUser;
}

export interface ResponseBody<I = string> {
  response: ResponseStatus;
  id: Unknowable<I>;
  message?: string;
}

export type ErrorResponse = Omit<IApplicationError, 'status'>;

export type Nullable<T> = T | null;

export type Unknowable<T> = T | unknown;

export type EmptyObject = Record<string, never>;

export type Middleware = (req: Request, res: Response, next: NextFunction) => void;

export type AsyncMiddleware = (req: Request, res: Response, next: NextFunction) => Promise<void>;

export type ValidationError = Unknowable<ZodError>;
