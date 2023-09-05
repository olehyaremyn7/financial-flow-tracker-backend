import { NextFunction, Request, Response } from 'express';

import { EmptyObject, Nullable, ResponseBody, ResponseLocals } from '../../interfaces/common.js';
import { AccountDocument } from '../../models/account/interfaces.js';
import { TransactionDocument } from '../../models/transaction/interfaces.js';
import {
  CreateAccountRequestInput,
  DeleteAccountRequestInput,
  GetAccountRequestInput,
  GetTransactionsRequestInput,
  UpdateAccountRequestInput,
} from '../../validation/account/interfaces.js';

export enum AccountResponseIds {
  ACCOUNTS_RECORDS = 'FOUND ACCOUNTS RECORDS',
  NO_ACCOUNTS_RECORDS = 'NO ACCOUNTS RECORDS',
  ACCOUNT_RECORD = 'FOUND ACCOUNT RECORD',
  NO_ACCOUNT_RECORD = 'NO ACCOUNT RECORD',
  TRANSACTIONS_RECORDS = 'FOUND TRANSACTIONS RECORDS',
  NO_TRANSACTIONS_RECORDS = 'NO TRANSACTIONS RECORDS',
  CREATED_ACCOUNT_RECORD = 'CREATED ACCOUNT RECORD',
  UPDATED_ACCOUNT_RECORD = 'UPDATED ACCOUNT RECORD',
  DELETED_ACCOUNT_RECORD = 'DELETED ACCOUNT RECORD',
}

export interface IAccountController {
  transactions(req: AccountTransactionsRequest, res: AccountTransactionsResponse, next: NextFunction): Promise<void>;
}

interface IndexResponseBody extends ResponseBody {
  accounts: AccountDocument[];
}

export type AccountIndexRequest = Request<EmptyObject, IndexResponseBody>;

export type AccountIndexResponse = Response<IndexResponseBody, ResponseLocals>;

interface ShowResponseBody extends ResponseBody {
  account: Nullable<AccountDocument>;
}

export type AccountShowRequest = Request<GetAccountRequestInput['params'], ShowResponseBody>;

export type AccountShowResponse = Response<ShowResponseBody>;

interface TransactionsResponseBody extends ResponseBody {
  transactions: TransactionDocument[];
}

export type AccountTransactionsRequest = Request<GetTransactionsRequestInput['params'], TransactionsResponseBody>;

export type AccountTransactionsResponse = Response<TransactionsResponseBody>;

interface CreateResponseBody extends ResponseBody {
  account: Nullable<AccountDocument>;
}

export type AccountCreateRequest = Request<EmptyObject, CreateResponseBody, CreateAccountRequestInput['body']>;

export type AccountCreateResponse = Response<CreateResponseBody, ResponseLocals>;

interface UpdateResponseBody extends ResponseBody {
  account: Nullable<AccountDocument>;
}

export type AccountUpdateRequest = Request<
  UpdateAccountRequestInput['params'],
  UpdateResponseBody,
  UpdateAccountRequestInput['body']
>;

export type AccountUpdateResponse = Response<UpdateResponseBody, ResponseLocals>;

interface DeleteResponseBody extends ResponseBody {}

export type AccountDeleteRequest = Request<DeleteAccountRequestInput['params'], DeleteResponseBody>;

export type AccountDeleteResponse = Response<DeleteResponseBody>;
