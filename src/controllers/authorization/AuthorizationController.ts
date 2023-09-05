import 'reflect-metadata';

import { CookieOptions, NextFunction } from 'express';
import { autoInjectable, container } from 'tsyringe';

import environment from '../../config/environments/environment.js';
import { Nullable, ResponseStatus } from '../../interfaces/common.js';
import { AuthorizationService } from '../../services/authorization/AuthorizationService.js';
import { convertToMs } from '../../utils/common.js';
import { ApplicationController } from '../ApplicationController/ApplicationController.js';
import {
  AuthenticationResponseIds,
  IAuthorizationController,
  LoginRequest,
  LoginResponse,
  LogoutRequest,
  LogoutResponse,
  RefreshRequest,
  RefreshResponse,
  RegistrationRequest,
  RegistrationResponse,
} from './interfaces.js';

@autoInjectable()
class AuthorizationController extends ApplicationController implements IAuthorizationController {
  private refreshTokenCookieName = 'refreshToken';

  private refreshTokenExpiration: Nullable<number> = null;

  public constructor(private authService: AuthorizationService) {
    super();

    this.login = this.login.bind(this);
    this.registration = this.registration.bind(this);
    this.logout = this.logout.bind(this);
    this.refresh = this.refresh.bind(this);
  }

  public async login({ body }: LoginRequest, res: LoginResponse, next: NextFunction): Promise<void> {
    try {
      const loggedUserAccess = await this.authService.login(body);
      const { refreshToken } = loggedUserAccess;

      res.cookie(this.refreshTokenCookieName, refreshToken, this.refreshTokenCookieOptions);
      res.status(200).json({
        response: ResponseStatus.SUCCESS,
        id: AuthenticationResponseIds.LOGGED_IN,
        ...loggedUserAccess,
      });
    } catch (error) {
      next(error);
    }
  }

  public async registration(
    { body }: RegistrationRequest,
    res: RegistrationResponse,
    next: NextFunction,
  ): Promise<void> {
    try {
      const user = await this.authService.registration(body);

      res.status(201).json({
        response: ResponseStatus.SUCCESS,
        id: AuthenticationResponseIds.REGISTERED,
        user,
      });
    } catch (error) {
      next(error);
    }
  }

  public async logout({ cookies }: LogoutRequest, res: LogoutResponse, next: NextFunction): Promise<void> {
    const { refreshToken } = cookies;

    try {
      await this.authService.logout(refreshToken);

      res.clearCookie(this.refreshTokenCookieName);
      res.status(200).json({
        response: ResponseStatus.SUCCESS,
        id: AuthenticationResponseIds.LOGGED_OUT,
      });
    } catch (error) {
      next(error);
    }
  }

  public async refresh({ cookies }: RefreshRequest, res: RefreshResponse, next: NextFunction): Promise<void> {
    const { refreshToken } = cookies;

    try {
      const loggedUserAccess = await this.authService.refresh(refreshToken);
      const { refreshToken: newRefreshToken } = loggedUserAccess;

      res.cookie(this.refreshTokenCookieName, newRefreshToken, this.refreshTokenCookieOptions);
      res.status(200).json({
        response: ResponseStatus.SUCCESS,
        id: AuthenticationResponseIds.SESSION_PROLONGED,
        ...loggedUserAccess,
      });
    } catch (error) {
      next(error);
    }
  }

  private get refreshTokenCookieOptions(): CookieOptions {
    if (!this.refreshTokenExpiration) {
      const { refreshTokenTtl } = environment;

      this.refreshTokenExpiration = convertToMs(refreshTokenTtl);
    }

    return {
      maxAge: this.refreshTokenExpiration,
      httpOnly: true,
      secure: true,
      sameSite: 'none',
    };
  }
}

export default container.resolve(AuthorizationController);
