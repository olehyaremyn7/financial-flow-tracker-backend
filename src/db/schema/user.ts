import { Schema } from 'mongoose';

import { normalizeMongoose } from '../../config/db.js';

export const userSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    username: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    ...normalizeMongoose,
  },
);
