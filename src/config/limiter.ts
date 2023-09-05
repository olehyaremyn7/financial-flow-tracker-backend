import { rateLimit } from 'express-rate-limit';

import { getMessage } from '../utils/common.js';
import { logMessage } from '../utils/logger.js';

const EXPIRE_TIME = 15 * 60 * 1000;

export const apiLimiter = rateLimit({
  windowMs: EXPIRE_TIME,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
  message: (): void => {
    logMessage(getMessage('server.errors.requestLimit'), 'warn');
  },
});
