import { exit } from 'node:process';

import moment from 'moment-timezone';

import environment from '../config/environments/environment.js';
import { NodeExitCode } from '../interfaces/application.js';
import { getMessage } from './common.js';
import { logMessage } from './logger.js';

export const stopApp = (exitCode: NodeExitCode = NodeExitCode.UncaughtFatalException): void => {
  exit(exitCode);
};

export const handleAppStartError = (message: string): never => {
  throw new Error(message);
};

export const getServerStartedLogs = (): void => {
  const messagesPaths: Array<string> = [
    'server.envMode',
    'server.startedOnPort',
    'server.apiListening',
    'server.apiReady',
  ];

  for (const path of messagesPaths) {
    logMessage(getMessage(path));
  }
};

export const setApplicationTimezone = (): void => {
  const { tz } = environment;

  moment.tz.setDefault(tz);
};

export const getCookieSecret = (): string | undefined => {
  const { cookieSecret = undefined } = environment;

  return cookieSecret;
};
