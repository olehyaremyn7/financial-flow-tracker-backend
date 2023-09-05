import { number, object, string } from 'zod';

const paramsWithId = {
  params: object({
    id: string({
      required_error: 'Id is required',
    })
      .nonempty()
      .min(10),
  }),
};

const accountFields = {
  body: object({
    title: string({
      required_error: 'Title is required',
    }).nonempty(),
    primary_balance: number().optional().default(0),
  }),
};

export const getAccountSchema = object({
  ...paramsWithId,
});

export const getTransactionsSchema = object({
  ...paramsWithId,
});

export const createAccountSchema = object({
  ...accountFields,
});

export const updateAccountSchema = object({
  ...paramsWithId,
  ...accountFields,
});

export const deleteAccountSchema = object({
  ...paramsWithId,
});
