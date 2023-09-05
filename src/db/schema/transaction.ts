import { Schema } from 'mongoose';

import { normalizeMongoose } from '../../config/db.js';
import { Collections } from '../../models/common/interfaces.js';
import { TransactionType } from '../../models/transaction/interfaces.js';

export const transactionSchema = new Schema(
  {
    account: {
      ref: Collections.ACCOUNT,
      type: Schema.Types.ObjectId,
      required: true,
    },
    user: {
      ref: Collections.USER,
      type: Schema.Types.ObjectId,
      required: true,
    },
    type: {
      type: String,
      enum: Object.values(TransactionType),
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    appointment: {
      type: String,
      default: 'Without appointment',
    },
    source: {
      type: String,
      default: 'Without source',
    },
    date: {
      type: Date,
      default: Date.now(),
    },
    note: {
      type: String,
      default: '',
    },
  },
  {
    timestamps: true,
    ...normalizeMongoose,
  },
);
