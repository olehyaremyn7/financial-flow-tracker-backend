import mongoose from 'mongoose';

import environment from '../../config/environments/environment.js';
import { handleAppStartError } from '../../utils/application.js';
import { getMessage } from '../../utils/common.js';
import { logMessage } from '../../utils/logger.js';

export const connectMongo = async (): Promise<void> => {
  const { mongoDbEndpoint } = environment;

  if (!mongoDbEndpoint) {
    handleAppStartError(getMessage('mongo.errors.endpoint'));
  }

  const { ConnectionStates } = mongoose;
  const {
    connect,
    connection: { readyState },
  } = mongoose;

  try {
    if (readyState !== ConnectionStates.connected) {
      await connect(mongoDbEndpoint);
    }
  } catch (error) {
    handleAppStartError(`${getMessage('mongo.errors.connection')} ${error}`);
  } finally {
    logMessage(getMessage('mongo.connected'));
  }
};
