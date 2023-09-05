import { model } from 'mongoose';

import { accountSchema } from '../../db/schema/account.js';
import { Collections } from '../common/interfaces.js';
import { AccountDocument } from './interfaces.js';

export default model<AccountDocument>(Collections.ACCOUNT, accountSchema);
