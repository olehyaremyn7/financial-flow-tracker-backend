import { JwtPayload, SignOptions } from 'jsonwebtoken';
import { ObjectId } from 'mongoose';

import { Nullable } from '../../interfaces/common.js';
import { SessionDocument } from '../../models/session/interfaces.js';
import { IUser, UserDocument } from '../../models/user/interfaces.js';

export interface IAuthorizationService {
  login(credentials: LoginCredentials): Promise<LoggedUserAccess>;
  registration(user: IUser): Promise<RegisteredUser>;
  logout(refreshToken: Token): Promise<void>;
  refresh(refreshToken: Token): Promise<LoggedUserAccess>;
}

export interface ISessionService {
  create(user: ObjectId, refreshToken: Token): Promise<SessionDocument>;
  update(user: ObjectId, refreshToken: Token): Promise<Nullable<SessionDocument>>;
  getByToken(refreshToken: Token): Promise<Nullable<SessionDocument>>;
  getByUser(user: ObjectId): Promise<Nullable<SessionDocument>>;
  verifyToken(refreshToken: Token): Promise<boolean>;
  delete(refreshToken: Token): Promise<void>;
}

export interface ITokenService {
  generateTokens<P extends object>(payload: P): Tokens;
  decodeJwt<D>(token: Token, tokenType: TokenType): Promise<DecodedToken<D>>;
  signJwt<P extends object>(payload: P, tokenType: TokenType, options?: SignOptions): Token;
  verifyJwt<P = JwtPayload | string>(token: Token, tokenType: TokenType): P;
}

export enum TokenType {
  ACCESS_TOKEN = 'accessToken',
  REFRESH_TOKEN = 'refreshToken',
}

export type Token = string;

export type TokenKey = string;

export type Tokens = Record<TokenType, Token>;

export interface DecodedToken<D> {
  valid: boolean;
  expired: boolean;
  decoded: Nullable<D>;
}

export type LoginCredentials = Omit<IUser, 'email'>;

export type LoggedUser = Pick<UserDocument, 'username' | '_id'>;

export type RegisteredUser = Pick<UserDocument, 'username' | '_id' | 'email'>;

export interface LoggedUserAccess extends Tokens {
  user: LoggedUser;
}
