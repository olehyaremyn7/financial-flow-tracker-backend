import { Schema } from 'mongoose';

import { normalizeMongoose } from '../../config/db.js';
import { Collections } from '../../models/common/interfaces.js';

export const sessionSchema = new Schema(
  {
    user: {
      ref: Collections.USER,
      type: Schema.Types.ObjectId,
      required: true,
    },
    refreshToken: {
      type: String,
      required: true,
      unique: true,
    },
  },
  {
    ...normalizeMongoose,
  },
);
