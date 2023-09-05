import bodyParser from 'body-parser';
import compression from 'compression';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';
import mongoSanitize from 'express-mongo-sanitize';
import helmet from 'helmet';
import hpp from 'hpp';
import morgan from 'morgan';
import swaggerUi from 'swagger-ui-express';

import { corsConfig } from './config/cors.js';
import swaggerDoc, { swaggerOptions } from './config/doc/swagger.js';
import { helmetConfig } from './config/helmet.js';
import { apiLimiter } from './config/limiter.js';
import { bodyParserUrlencodedConfig } from './config/parsers.js';
import { initializeAuthentication } from './middleware/authentication/Authentication.js';
import { errorHandler } from './middleware/common/errorHandler.js';
import { sanitizeResource } from './middleware/validation/sanitizeResource.js';
import routes from './routes/index.js';
import { getCookieSecret, setApplicationTimezone } from './utils/application.js';

setApplicationTimezone();

const app = express();

app.use(morgan('dev'));
app.use(cookieParser(getCookieSecret()));
app.use(bodyParser.urlencoded(bodyParserUrlencodedConfig));
app.use(bodyParser.json());
app.use(hpp());
app.use(cors(corsConfig));
app.use(helmet(helmetConfig));
app.use(compression());
app.use(sanitizeResource);
app.use(mongoSanitize());
app.use(apiLimiter);
app.use(initializeAuthentication);
app.disable('x-powered-by');

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDoc, swaggerOptions));
routes.initialize(app).apply();

app.use(errorHandler);

export default app;
