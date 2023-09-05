import { Nullable } from '../../interfaces/common.js';
import { ITransaction, TransactionDocument } from '../../models/transaction/interfaces.js';
import Transaction from '../../models/transaction/Transaction.js';
import { ITransactionService } from './interfaces.js';

export class TransactionService implements ITransactionService {
  public async all(account: string): Promise<TransactionDocument[]> {
    return Transaction.find({ account });
  }

  public async id(_id: string): Promise<Nullable<TransactionDocument>> {
    return Transaction.findOne({ _id });
  }

  public async create(transaction: ITransaction): Promise<TransactionDocument> {
    return Transaction.create(transaction);
  }

  public async update(_id: string, transaction: ITransaction): Promise<Nullable<TransactionDocument>> {
    return Transaction.findOneAndUpdate({ _id }, { $set: transaction }, { new: true });
  }

  public async delete(_id: string): Promise<void> {
    await Transaction.deleteOne({ _id });
  }

  public async deleteAll(account: string): Promise<void> {
    await Transaction.deleteMany({ account });
  }
}
