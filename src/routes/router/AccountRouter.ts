import { Router } from 'express';

import accountController from '../../controllers/account/AccountController.js';
import { canActivate } from '../../middleware/authentication/Authentication.js';
import { validateResource } from '../../middleware/validation/validateResource.js';
import { accountValidationSchemas } from '../../validation/index.js';
import { AccountRoutes } from './interfaces.js';

const { index, show, transactions, update, destroy, create } = accountController;
const { getAccountSchema, getTransactionsSchema, createAccountSchema, updateAccountSchema, deleteAccountSchema } =
  accountValidationSchemas;

const accountRouter = Router();

accountRouter.use(canActivate);

accountRouter.get(AccountRoutes.INDEX, index);
accountRouter.get(AccountRoutes.SHOW, validateResource(getAccountSchema), show);
accountRouter.get(AccountRoutes.TRANSACTIONS, validateResource(getTransactionsSchema), transactions);
accountRouter.post(AccountRoutes.CREATE, validateResource(createAccountSchema), create);
accountRouter.patch(AccountRoutes.UPDATE, validateResource(updateAccountSchema), update);
accountRouter.delete(AccountRoutes.DESTROY, validateResource(deleteAccountSchema), destroy);

export default accountRouter;
