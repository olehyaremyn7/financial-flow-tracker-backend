import { Mode } from '../../interfaces/application.js';

export interface CommonEnv {
  mode: Mode;
  port: number;
  corsAllowedOrigins: string;
  mongoDbEndpoint: string;
  redisEndpoint: string;
  saltWorkFactor: number;
  accessTokenPrivateKey: string;
  accessTokenPublicKey: string;
  refreshTokenPrivateKey: string;
  refreshTokenPublicKey: string;
  accessTokenTtl: string;
  refreshTokenTtl: string;
  debug?: boolean;
  host: string;
  appName: string;
  appVersion: string;
  tz: string;
  locales: string;
  cookieSecret?: string;
  [p: string]: unknown;
}

type ModeCommon = Pick<CommonEnv, 'mode'>;

export type DevelopmentEnv = ModeCommon;

export type ProductionEnv = ModeCommon;

export type AppEnv = DevelopmentEnv & ProductionEnv & CommonEnv;
