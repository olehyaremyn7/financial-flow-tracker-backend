import { Document } from 'mongoose';

export interface IUser {
  email: string;
  username: string;
  password: string;
}

export interface UserDocument extends IUser, Document {
  createdAt: Date;
  updatedAt: Date;
}
