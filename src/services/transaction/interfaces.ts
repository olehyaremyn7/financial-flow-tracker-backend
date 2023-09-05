import { Nullable } from '../../interfaces/common.js';
import { ITransaction, TransactionDocument } from '../../models/transaction/interfaces.js';

export interface ITransactionService {
  all(account: string): Promise<TransactionDocument[]>;
  id(_id: string): Promise<Nullable<TransactionDocument>>;
  create(transaction: ITransaction): Promise<TransactionDocument>;
  update(_id: string, transaction: ITransaction): Promise<Nullable<TransactionDocument>>;
  delete(_id: string): Promise<void>;
  deleteAll(account: string): Promise<void>;
}
