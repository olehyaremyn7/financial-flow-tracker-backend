import { CorsOptions } from 'cors';

import { stopApp } from '../utils/application.js';
import { getMessage, splitStrByCommas } from '../utils/common.js';
import { logMessage } from '../utils/logger.js';
import environment from './environments/environment.js';

const { corsAllowedOrigins } = environment;

if (!corsAllowedOrigins) {
  logMessage(getMessage('server.errors.cors'), 'fatal');

  stopApp();
}

export const corsConfig: CorsOptions = {
  origin: splitStrByCommas(corsAllowedOrigins) ?? [],
  methods: ['GET', 'POST', 'PATCH', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization', 'responseType'],
  credentials: true,
};
