import { NextFunction, Request, Response } from 'express';

import { EmptyObject, Nullable } from '../../interfaces/common.js';
import { LoggedUser } from '../../services/authorization/interfaces.js';

export interface InitializeAuthentication {
  initializeAuthentication(req: Request, res: InitializeResponse, next: NextFunction): Promise<void>;
}

export interface CanActivate {
  canActivate(req: Request, res: CanActivateResponse, next: NextFunction): Promise<void>;
}

interface DeserializedUser {
  user: Nullable<LoggedUser>;
}

export type InitializeResponse = Response<EmptyObject, DeserializedUser>;

export type CanActivateResponse = Response<EmptyObject, DeserializedUser>;
