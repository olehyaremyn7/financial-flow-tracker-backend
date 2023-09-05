import { ResponseBody, ValidationError } from '../../interfaces/common.js';

export interface IApplicationError extends Required<ResponseBody> {
  status: number;
  validation?: ValidationError;
}

export enum Collections {
  USER = 'User',
  ACCOUNT = 'Account',
  TRANSACTION = 'Transaction',
  SESSION = 'Session',
}
