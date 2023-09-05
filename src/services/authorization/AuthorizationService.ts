import _ from 'lodash';
import { autoInjectable } from 'tsyringe';

import { AuthenticationResponseIds } from '../../controllers/authorization/interfaces.js';
import { IUser } from '../../models/user/interfaces.js';
import User from '../../models/user/User.js';
import { compareHashes, hash } from '../../utils/bcrypt.js';
import { getMessage } from '../../utils/common.js';
import { createLoggedUserDto, createRegisteredUserDto } from '../../utils/dtos.js';
import { ErrorService } from '../common/ErrorService.js';
import {
  IAuthorizationService,
  LoggedUser,
  LoggedUserAccess,
  LoginCredentials,
  RegisteredUser,
  Token,
  TokenType,
} from './interfaces.js';
import { SessionService } from './SessionService.js';
import { TokenService } from './TokenService.js';

@autoInjectable()
export class AuthorizationService implements IAuthorizationService {
  public constructor(
    private sessionService: SessionService,
    private tokenService: TokenService,
    private errorService: ErrorService,
  ) {}

  public async login(credentials: LoginCredentials): Promise<LoggedUserAccess> {
    const user = await this.verifyLoginCredentials(credentials);
    const { accessToken, refreshToken } = this.tokenService.generateTokens(user);

    await this.sessionService.create(user._id, refreshToken);

    return {
      accessToken,
      refreshToken,
      user,
    };
  }

  public async registration({ email, password, username }: IUser): Promise<RegisteredUser> {
    const [isEmailExist, isUsernameExist] = await Promise.all([this.verifyEmail(email), this.verifyUsername(username)]);

    if (isEmailExist || isUsernameExist) {
      const errorMessage = getMessage(`authorization.registration.validation.${isEmailExist ? 'email' : 'username'}`);
      const { EMAIL_EXIST, USERNAME_EXIST } = AuthenticationResponseIds;

      this.errorService.handleBadRequest(errorMessage, isEmailExist ? EMAIL_EXIST : USERNAME_EXIST);
    }

    const hashedPassword = await hash(password);
    const user = await User.create({ email, username, password: hashedPassword });

    return createRegisteredUserDto(user);
  }

  public async logout(refreshToken: Token): Promise<void> {
    await this.sessionService.delete(refreshToken);
  }

  public async refresh(refreshToken: Token): Promise<LoggedUserAccess> {
    const [{ decoded, expired }, activeSession] = await Promise.all([
      this.tokenService.decodeJwt<LoggedUser>(refreshToken, TokenType.REFRESH_TOKEN),
      this.sessionService.verifyToken(refreshToken),
    ]);
    const errorMessage = getMessage('authorization.refresh.validation.token');
    const { REFRESH_ERROR } = AuthenticationResponseIds;

    if (_.isEmpty(decoded) || expired || !activeSession) {
      this.errorService.handleBadRequest(errorMessage, REFRESH_ERROR);
    }

    const isDecodedUserValid = await this.verifyDecodedUser(decoded);

    if (!isDecodedUserValid) {
      this.errorService.handleBadRequest(errorMessage, REFRESH_ERROR);
    }

    const { accessToken, refreshToken: newRefreshToken } = this.tokenService.generateTokens(decoded);

    await this.sessionService.update(decoded._id, newRefreshToken);

    return {
      accessToken,
      refreshToken,
      user: decoded,
    };
  }

  private async verifyLoginCredentials({ username, password }: LoginCredentials): Promise<LoggedUser> {
    const existingUser = await User.findOne({ username }).select('username password _id');
    const invalidCredentialsMessage = getMessage('authorization.login.validation.credentials');
    const { INVALID_CREDENTIALS } = AuthenticationResponseIds;

    if (_.isEmpty(existingUser)) {
      this.errorService.handleBadRequest(invalidCredentialsMessage, INVALID_CREDENTIALS);
    }

    const { password: userPassword } = existingUser;
    const isPasswordsMatch = compareHashes(password, userPassword);

    if (!isPasswordsMatch) {
      this.errorService.handleBadRequest(invalidCredentialsMessage, INVALID_CREDENTIALS);
    }

    return createLoggedUserDto(existingUser);
  }

  private async verifyEmail(email: string): Promise<boolean> {
    const user = await User.findOne({ email });

    return !_.isEmpty(user);
  }

  private async verifyUsername(username: string): Promise<boolean> {
    const user = await User.findOne({ username });

    return !_.isEmpty(user);
  }

  private async verifyDecodedUser({ _id }: LoggedUser): Promise<boolean> {
    const user = await User.findOne({ _id });

    return !_.isEmpty(user);
  }
}
