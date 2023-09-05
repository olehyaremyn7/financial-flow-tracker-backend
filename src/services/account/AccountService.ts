import { ObjectId } from 'mongoose';

import { Nullable } from '../../interfaces/common.js';
import Account from '../../models/account/Account.js';
import { AccountDocument, IAccount } from '../../models/account/interfaces.js';
import { IAccountService } from './interfaces.js';

export class AccountService implements IAccountService {
  public async all(user: ObjectId): Promise<AccountDocument[]> {
    return Account.find({ user });
  }

  public async id(_id: string): Promise<Nullable<AccountDocument>> {
    return Account.findOne({ _id });
  }

  public async create(account: IAccount): Promise<AccountDocument> {
    return Account.create(account);
  }

  public async update(_id: string, account: IAccount): Promise<Nullable<AccountDocument>> {
    return Account.findOneAndUpdate({ _id }, { $set: account }, { new: true });
  }

  public async delete(_id: string): Promise<void> {
    await Account.deleteOne({ _id });
  }
}
