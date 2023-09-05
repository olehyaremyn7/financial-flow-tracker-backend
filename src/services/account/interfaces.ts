import { ObjectId } from 'mongoose';

import { Nullable } from '../../interfaces/common.js';
import { AccountDocument, IAccount } from '../../models/account/interfaces.js';

export interface IAccountService {
  all(user: ObjectId): Promise<AccountDocument[]>;
  id(_id: string): Promise<Nullable<AccountDocument>>;
  create(account: IAccount): Promise<AccountDocument>;
  update(_id: string, account: IAccount): Promise<Nullable<AccountDocument>>;
  delete(_id: string): Promise<void>;
}
