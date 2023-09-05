import swaggerJSDoc, { Options } from 'swagger-jsdoc';
import { SwaggerUiOptions } from 'swagger-ui-express';

import environment from '../environments/environment.js';

const { port, appName, appVersion } = environment;

const options: Options = {
  definition: {
    openapi: '3.1.0',
    info: {
      title: `${appName} with Swagger`,
      version: appVersion,
      description: '',
      license: {
        name: 'MIT',
        url: 'https://spdx.org/licenses/MIT.html',
      },
    },
    servers: [
      {
        url: `http://localhost:${port}`,
      },
    ],
  },
  apis: ['./routes/*.js'],
};

export const swaggerOptions: SwaggerUiOptions = {
  explorer: true,
};

export default swaggerJSDoc(options);
