import { TypeOf } from 'zod';

import {
  createTransactionSchema,
  deleteTransactionSchema,
  getTransactionSchema,
  updateTransactionSchema,
} from './index.js';

export type GetTransactionRequestInput = TypeOf<typeof getTransactionSchema>;

export type CreateTransactionRequestInput = TypeOf<typeof createTransactionSchema>;

export type UpdateTransactionRequestInput = TypeOf<typeof updateTransactionSchema>;

export type DeleteTransactionRequestInput = TypeOf<typeof deleteTransactionSchema>;
