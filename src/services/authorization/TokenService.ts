import jwt, { JwtPayload, SignOptions } from 'jsonwebtoken';
import _ from 'lodash';

import environment from '../../config/environments/environment.js';
import { JWT_EXPIRATION_MESSAGE } from '../../constants/index.js';
import { DecodedToken, ITokenService, Token, TokenKey, Tokens, TokenType } from './interfaces.js';

export class TokenService implements ITokenService {
  public generateTokens<P extends object>(payload: P): Tokens {
    const { ACCESS_TOKEN, REFRESH_TOKEN } = TokenType;
    const accessToken = this.signJwt(payload, ACCESS_TOKEN);
    const refreshToken = this.signJwt(payload, REFRESH_TOKEN);

    return {
      accessToken,
      refreshToken,
    };
  }

  public async decodeJwt<D>(token: Token, tokenType: TokenType): Promise<DecodedToken<D>> {
    try {
      const decoded = this.verifyJwt<D>(token, tokenType) as NonNullable<D>;

      return {
        valid: true,
        expired: false,
        decoded: _.pick(decoded, ['username', '_id']) as D,
      };
    } catch (error) {
      const { message } = error as Error;
      const expired = message === JWT_EXPIRATION_MESSAGE;

      return {
        expired,
        valid: false,
        decoded: null,
      };
    }
  }

  public signJwt<P extends object>(payload: P, tokenType: TokenType, options?: SignOptions): Token {
    const { accessTokenTtl, refreshTokenTtl } = environment;
    const isAccessToken = this.isAccessToken(tokenType);
    const expiresIn = isAccessToken ? accessTokenTtl : refreshTokenTtl;
    const signingKey = this.createBuffer(isAccessToken ? this.accessTokenPrivateKey : this.refreshTokenPrivateKey);

    return jwt.sign(payload, signingKey, {
      ...(options && options),
      expiresIn,
      algorithm: 'RS256',
    });
  }

  public verifyJwt<P = JwtPayload | string>(token: Token, tokenType: TokenType): P {
    const publicKey = this.createBuffer(
      this.isAccessToken(tokenType) ? this.accessTokenPublicKey : this.refreshTokenPublicKey,
    );

    return jwt.verify(token, publicKey) as P;
  }

  private createBuffer<K = TokenKey>(tokenKey: K): K {
    return Buffer.from(tokenKey as string, 'base64').toString('ascii') as K;
  }

  private isAccessToken(tokenType: TokenType): boolean {
    return tokenType === TokenType.ACCESS_TOKEN;
  }

  private get accessTokenPrivateKey(): TokenKey {
    const { accessTokenPrivateKey } = environment;

    return accessTokenPrivateKey;
  }

  private get accessTokenPublicKey(): TokenKey {
    const { accessTokenPublicKey } = environment;

    return accessTokenPublicKey;
  }

  private get refreshTokenPrivateKey(): TokenKey {
    const { refreshTokenPrivateKey } = environment;

    return refreshTokenPrivateKey;
  }

  private get refreshTokenPublicKey(): TokenKey {
    const { refreshTokenPublicKey } = environment;

    return refreshTokenPublicKey;
  }
}
