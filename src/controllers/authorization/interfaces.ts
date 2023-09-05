import { NextFunction, Request, Response } from 'express';

import { EmptyObject, ResponseBody } from '../../interfaces/common.js';
import { LoggedUserAccess, RegisteredUser } from '../../services/authorization/interfaces.js';
import {
  LoginRequestInput,
  LogoutRequestInput,
  RefreshRequestInput,
  RegistrationRequestInput,
} from '../../validation/authorization/interfaces.js';

export interface IAuthorizationController {
  login(req: LoginRequest, res: LoginResponse, next: NextFunction): Promise<void>;
  registration(req: RegistrationRequest, res: RegistrationResponse, next: NextFunction): Promise<void>;
  logout(req: LogoutRequest, res: LogoutResponse, next: NextFunction): Promise<void>;
  refresh(req: RefreshRequest, res: RefreshResponse, next: NextFunction): Promise<void>;
}

export enum AuthenticationResponseIds {
  LOGGED_IN = 'LOGGED IN',
  REGISTERED = 'REGISTERED',
  LOGGED_OUT = 'LOGGED OUT',
  SESSION_PROLONGED = 'SESSION PROLONGED',
  EMAIL_EXIST = 'EMAIL EXIST',
  USERNAME_EXIST = 'USERNAME EXIST',
  INVALID_CREDENTIALS = 'INVALID LOGIN CREDENTIALS',
  UNAUTHENTICATED = 'UNAUTHORIZED',
  REFRESH_ERROR = 'INVALID TOKEN',
}

export interface LoginResponseBody extends LoggedUserAccess, ResponseBody {}

export type LoginRequest = Request<EmptyObject, LoginResponseBody, LoginRequestInput['body']>;

export type LoginResponse = Response<LoginResponseBody>;

export interface RegistrationResponseBody extends ResponseBody {
  user: RegisteredUser;
}

export type RegistrationRequest = Request<EmptyObject, RegistrationResponseBody, RegistrationRequestInput['body']>;

export type RegistrationResponse = Response<RegistrationResponseBody>;

interface LogoutResponseBody extends ResponseBody {}

export interface LogoutRequest extends Request<EmptyObject, LogoutResponseBody> {
  cookies: LogoutRequestInput['cookies'];
}

export type LogoutResponse = Response<LogoutResponseBody>;

export interface RefreshResponseBody extends LoginResponseBody {}

export interface RefreshRequest extends Request<EmptyObject, RefreshResponseBody> {
  cookies: RefreshRequestInput['cookies'];
}

export type RefreshResponse = Response<RefreshResponseBody>;
