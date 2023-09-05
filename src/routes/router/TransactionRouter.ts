import { Router } from 'express';

import transactionController from '../../controllers/transaction/TransactionController.js';
import { canActivate } from '../../middleware/authentication/Authentication.js';
import { validateResource } from '../../middleware/validation/validateResource.js';
import { transactionValidationSchemas } from '../../validation/index.js';
import { TransactionRoutes } from './interfaces.js';

const { show, update, destroy, create } = transactionController;
const { getTransactionSchema, createTransactionSchema, updateTransactionSchema, deleteTransactionSchema } =
  transactionValidationSchemas;

const transactionRouter = Router();

transactionRouter.use(canActivate);

transactionRouter.get(TransactionRoutes.SHOW, validateResource(getTransactionSchema), show);
transactionRouter.post(TransactionRoutes.CREATE, validateResource(createTransactionSchema), create);
transactionRouter.patch(TransactionRoutes.UPDATE, validateResource(updateTransactionSchema), update);
transactionRouter.delete(TransactionRoutes.DESTROY, validateResource(deleteTransactionSchema), destroy);

export default transactionRouter;
