import { date, enum as Enum, number, object, string } from 'zod';

import { TransactionType } from '../../models/transaction/interfaces.js';

const paramsWithId = {
  params: object({
    id: string({
      required_error: 'Id is required',
    })
      .nonempty()
      .min(10),
  }),
};

const transactionFields = {
  body: object({
    account: string({
      required_error: 'Account id is required',
    }),
    type: Enum([TransactionType.EXPENSES, TransactionType.INCOME], {
      required_error: 'Type is required',
    }),
    price: number({
      required_error: 'Price is required',
    }),
    appointment: string().optional(),
    source: string().optional(),
    date: date().optional(),
    note: string().optional(),
  }),
};

export const getTransactionSchema = object({
  ...paramsWithId,
});

export const createTransactionSchema = object({
  ...transactionFields,
});

export const updateTransactionSchema = object({
  ...paramsWithId,
  ...transactionFields,
});

export const deleteTransactionSchema = object({
  ...paramsWithId,
});
