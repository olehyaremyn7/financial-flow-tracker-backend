import { Level, pino } from 'pino';

const logger = pino({
  base: {},
  transport: {
    target: 'pino-pretty',
    options: {
      colorize: true,
      colorizeObjects: true,
      translateTime: 'yyyy/mm/dd HH:MM:ss',
      ignore: false,
    },
  },
});

export const logMessage = <T = unknown>(text: string, level: Level = 'info', options?: T): void => {
  logger[level](options, text);
};
