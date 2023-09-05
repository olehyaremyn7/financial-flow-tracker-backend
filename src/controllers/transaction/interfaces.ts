import { Request, Response } from 'express';

import { EmptyObject, Nullable, ResponseBody, ResponseLocals } from '../../interfaces/common.js';
import { TransactionDocument } from '../../models/transaction/interfaces.js';
import {
  CreateTransactionRequestInput,
  DeleteTransactionRequestInput,
  GetTransactionRequestInput,
  UpdateTransactionRequestInput,
} from '../../validation/transaction/interfaces.js';

export enum TransactionResponseIds {
  TRANSACTION_RECORD = 'FOUND TRANSACTION RECORD',
  NO_TRANSACTION_RECORD = 'NO TRANSACTION RECORD',
  CREATED_TRANSACTION_RECORD = 'CREATED TRANSACTION RECORD',
  UPDATED_TRANSACTION_RECORD = 'UPDATED TRANSACTION RECORD',
  DELETED_TRANSACTION_RECORD = 'DELETED TRANSACTION RECORD',
}

interface ShowResponseBody extends ResponseBody {
  transaction: Nullable<TransactionDocument>;
}

export type TransactionShowRequest = Request<GetTransactionRequestInput['params'], ShowResponseBody>;

export type TransactionShowResponse = Response<ShowResponseBody>;

interface CreateResponseBody extends ResponseBody {
  transaction: Nullable<TransactionDocument>;
}

export type TransactionCreateRequest = Request<EmptyObject, CreateResponseBody, CreateTransactionRequestInput['body']>;

export type TransactionCreateResponse = Response<CreateResponseBody, ResponseLocals>;

interface UpdateResponseBody extends ResponseBody {
  transaction: Nullable<TransactionDocument>;
}

export type TransactionUpdateRequest = Request<
  UpdateTransactionRequestInput['params'],
  UpdateResponseBody,
  UpdateTransactionRequestInput['body']
>;

export type TransactionUpdateResponse = Response<UpdateResponseBody, ResponseLocals>;

interface DeleteResponseBody extends ResponseBody {}

export type TransactionDeleteRequest = Request<DeleteTransactionRequestInput['params'], DeleteResponseBody>;

export type TransactionDeleteResponse = Response<DeleteResponseBody>;
