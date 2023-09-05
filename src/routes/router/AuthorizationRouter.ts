import { Router } from 'express';

import authorizationController from '../../controllers/authorization/AuthorizationController.js';
import { canActivate } from '../../middleware/authentication/Authentication.js';
import { validateResource } from '../../middleware/validation/validateResource.js';
import { authorizationValidationSchemas } from '../../validation/index.js';
import { AuthorizationRoutes } from './interfaces.js';

const { login, registration, refresh, logout } = authorizationController;
const { loginSchema, registrationSchema, logoutSchema, refreshSchema } = authorizationValidationSchemas;

const authorizationRouter = Router();

authorizationRouter.post(AuthorizationRoutes.LOGIN, validateResource(loginSchema), login);
authorizationRouter.post(AuthorizationRoutes.REGISTRATION, validateResource(registrationSchema), registration);
authorizationRouter.post(AuthorizationRoutes.REFRESH, validateResource(refreshSchema), refresh);
authorizationRouter.post(AuthorizationRoutes.LOGOUT, validateResource(logoutSchema), canActivate, logout);

export default authorizationRouter;
