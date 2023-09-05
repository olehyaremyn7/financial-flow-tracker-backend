import app from '../app.js';
import environment from '../config/environments/environment.js';
import { connectMongo } from '../db/connections/mongo.js';
import redis, { connectRedis } from '../db/connections/redis.js';
import { getServerStartedLogs, handleAppStartError, stopApp } from '../utils/application.js';
import { getMessage } from '../utils/common.js';
import { logMessage } from '../utils/logger.js';

const { port, mode, host } = environment;

try {
  if (!port || !mode) {
    handleAppStartError(getMessage(`server.errors.${!port ? 'port' : 'envMode'}`));
  }

  app.listen(port, host);

  await Promise.all([connectMongo(), connectRedis(redis)]);
} catch (error) {
  logMessage(`${getMessage('server.errors.serverStart')} ${(error as Error).message}`, 'fatal');

  stopApp();
} finally {
  getServerStartedLogs();
}
