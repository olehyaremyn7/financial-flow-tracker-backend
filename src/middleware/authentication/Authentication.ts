import 'reflect-metadata';

import { NextFunction, Request } from 'express';
import _ from 'lodash';
import { autoInjectable, container } from 'tsyringe';

import { LoggedUser, Token, TokenType } from '../../services/authorization/interfaces.js';
import { TokenService } from '../../services/authorization/TokenService.js';
import { ErrorService } from '../../services/common/ErrorService.js';
import { CanActivate, CanActivateResponse, InitializeAuthentication, InitializeResponse } from './interfaces.js';

@autoInjectable()
class Authentication implements InitializeAuthentication, CanActivate {
  public constructor(
    private tokenService: TokenService,
    private errorService: ErrorService,
  ) {
    this.initializeAuthentication = this.initializeAuthentication.bind(this);
    this.canActivate = this.canActivate.bind(this);
  }

  public async initializeAuthentication(req: Request, res: InitializeResponse, next: NextFunction): Promise<void> {
    try {
      const accessToken = this.extractJwtAccessToken(req);

      if (!accessToken) {
        return next();
      }

      const { decoded, expired, valid } = await this.tokenService.decodeJwt<LoggedUser>(
        accessToken,
        TokenType.ACCESS_TOKEN,
      );

      if (expired || !valid) {
        this.errorService.handleUnauthenticated();
      }

      if (decoded) {
        res.locals.user = decoded;

        return next();
      }

      next();
    } catch (error) {
      next(error);
    }
  }

  public async canActivate(
    _req: Request,
    { locals: { user } }: CanActivateResponse,
    next: NextFunction,
  ): Promise<void> {
    try {
      if (!user) {
        this.errorService.handleUnauthenticated();
      }

      next();
    } catch (error) {
      next(error);
    }
  }

  private extractJwtAccessToken(req: Request): Token {
    return _.get(req, 'headers.authorization', '').replace(/^Bearer\s/, '');
  }
}

export const { initializeAuthentication, canActivate } = container.resolve(Authentication);
