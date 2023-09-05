import { Document, ObjectId } from 'mongoose';

export enum TransactionType {
  INCOME = 'income',
  EXPENSES = 'expenses',
}

export interface ITransaction {
  account: ObjectId | string;
  user: ObjectId;
  type: TransactionType;
  price: number;
  appointment?: string;
  source?: string;
  date?: Date;
  note?: string;
}

export interface TransactionDocument extends ITransaction, Document {
  createdAt: Date;
  updatedAt: Date;
}
