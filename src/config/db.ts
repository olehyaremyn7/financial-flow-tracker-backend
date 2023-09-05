import { SchemaOptions } from 'mongoose';

export const normalizeMongoose: SchemaOptions = {
  versionKey: false,
  virtuals: true,
};
