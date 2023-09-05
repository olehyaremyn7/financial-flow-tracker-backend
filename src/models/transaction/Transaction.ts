import { model } from 'mongoose';

import { transactionSchema } from '../../db/schema/transaction.js';
import { Collections } from '../common/interfaces.js';
import { TransactionDocument } from './interfaces.js';

export default model<TransactionDocument>(Collections.TRANSACTION, transactionSchema);
