import { TypeOf } from 'zod';

import {
  createAccountSchema,
  deleteAccountSchema,
  getAccountSchema,
  getTransactionsSchema,
  updateAccountSchema,
} from './index.js';

export type GetAccountRequestInput = TypeOf<typeof getAccountSchema>;

export type GetTransactionsRequestInput = TypeOf<typeof getTransactionsSchema>;

export type CreateAccountRequestInput = TypeOf<typeof createAccountSchema>;

export type UpdateAccountRequestInput = TypeOf<typeof updateAccountSchema>;

export type DeleteAccountRequestInput = TypeOf<typeof deleteAccountSchema>;
