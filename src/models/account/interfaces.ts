import { Document, ObjectId } from 'mongoose';

export interface IAccount {
  user: ObjectId;
  title: string;
  primary_balance?: number;
  current_balance?: number;
  expenses?: number;
  incomes?: number;
  periodBalance?: number;
}

export interface AccountDocument extends IAccount, Document {
  createdAt: Date;
  updatedAt: Date;
}
