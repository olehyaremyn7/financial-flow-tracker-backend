import { createClient } from 'redis';

import environment from '../../config/environments/environment.js';
import { handleAppStartError, stopApp } from '../../utils/application.js';
import { getMessage } from '../../utils/common.js';
import { logMessage } from '../../utils/logger.js';

const { redisEndpoint } = environment;

if (!redisEndpoint) {
  logMessage(getMessage('redis.errors.endpoint'), 'fatal');

  stopApp();
}

const redis = createClient({ url: redisEndpoint });

export const connectRedis = async <R extends typeof redis>(client: R): Promise<void> => {
  try {
    if (!client.isOpen) {
      await client.connect();
    }
  } catch (error) {
    handleAppStartError(`${getMessage('redis.errors.connection')} ${error}`);
  } finally {
    logMessage(getMessage('redis.connected'));
  }
};

export default redis;
