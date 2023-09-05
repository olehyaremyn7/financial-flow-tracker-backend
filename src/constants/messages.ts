import environment from '../config/environments/environment.js';
import { isProd } from '../utils/environment.js';

const { port, mode, appName, appVersion, host } = environment;

export default {
  server: {
    envMode: `The server is running in ${mode.toUpperCase()} mode`,
    startedOnPort: `The server is started on the port ${port}`,
    apiListening: `Express application listening on ${isProd() ? 'https' : 'http'}://${host}:${port}`,
    apiReady: `The ${appName} v${appVersion} is ready to go! Waiting for external requests...`,
    errors: {
      envMode: `Environment mode not defined! Unable to start server. Go into NODE_ENV="production" or NODE_ENV="development" mode to process`,
      port: `The server port is not defined! Unable to start server. Pass the PORT number to process`,
      cors: 'Not provided CORS allowed origins',
      serverStart: 'An error occurred while starting the server:',
      requestLimit: 'Too many requests addressed to API',
      express: 'Express instance is not defined',
    },
  },
  mongo: {
    errors: {
      connection: 'Failed to connect to MongoDB database. Error:',
      requestLimit: 'Too many requests addressed to MongoDB',
      endpoint:
        'MongoDB connection URL not available! Failed to connect to MongoDB database and start server. Pass the correct URL to process',
    },
    connected: 'MongoDB database has been successfully connected. Expecting server to start',
  },
  redis: {
    errors: {
      connection: 'Failed to connect to Redis Cloud database. Error:',
      endpoint:
        'Redis connection URL not available! Failed to connect to Redis Cloud database and start server. Pass the correct URL to process',
    },
    connected: 'Redis database has been successfully connected. Expecting server to start',
  },
  authorization: {
    login: {
      validation: {
        credentials: 'Incorrect username or password. Please check input data',
      },
    },
    registration: {
      validation: {
        email: 'This email address is already in use. Enter another email address',
        username: 'This username is already in use. Enter another username',
      },
    },
    refresh: {
      validation: {
        token: 'Invalid refresh token',
      },
    },
  },
  common: {
    errors: {
      unauthorized: 'Access denied',
      validation: 'Validation failed',
    },
  },
};
