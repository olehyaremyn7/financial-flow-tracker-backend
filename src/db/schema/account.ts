import { Schema } from 'mongoose';

import { normalizeMongoose } from '../../config/db.js';
import { Collections } from '../../models/common/interfaces.js';

export const accountSchema = new Schema(
  {
    user: {
      ref: Collections.USER,
      type: Schema.Types.ObjectId,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    primary_balance: {
      type: Number,
      default: 0,
    },
    current_balance: {
      type: Number,
      default: 0,
    },
    expenses: {
      type: Number,
      default: 0,
    },
    incomes: {
      type: Number,
      default: 0,
    },
    periodBalance: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
    ...normalizeMongoose,
  },
);
