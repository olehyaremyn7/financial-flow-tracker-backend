import _ from 'lodash';

import environment from '../config/environments/environment.js';
import { AppEnv, CommonEnv } from '../config/environments/interface.js';
import { NODE_ENVIRONMENT } from '../constants/index.js';
import { Mode } from '../interfaces/application.js';

export const isProd = (): boolean => environment.mode === Mode.PRODUCTION;

export const getNodeEnv = (): string => _.get(process.env, NODE_ENVIRONMENT, '');

export const getEnvVars = (): CommonEnv =>
  _.mapKeys(process.env, (_value: string | unknown, key: string): string => {
    let envKey = key;

    if (envKey === NODE_ENVIRONMENT) {
      envKey = 'mode';
    }

    return _.camelCase(envKey.toLowerCase());
  }) as CommonEnv;

export const mergeEnv = <T>(commonEnv: AppEnv, setup: T): AppEnv => _.merge(commonEnv, setup);
