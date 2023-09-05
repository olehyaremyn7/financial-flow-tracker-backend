import 'reflect-metadata';

import { NextFunction } from 'express';
import _ from 'lodash';
import { autoInjectable, container } from 'tsyringe';

import { ResponseStatus } from '../../interfaces/common.js';
import { AccountService } from '../../services/account/AccountService.js';
import { TransactionService } from '../../services/transaction/TransactionService.js';
import { ApplicationController } from '../ApplicationController/ApplicationController.js';
import {
  AccountCreateRequest,
  AccountCreateResponse,
  AccountDeleteRequest,
  AccountDeleteResponse,
  AccountIndexRequest,
  AccountIndexResponse,
  AccountResponseIds,
  AccountShowRequest,
  AccountShowResponse,
  AccountTransactionsRequest,
  AccountTransactionsResponse,
  AccountUpdateRequest,
  AccountUpdateResponse,
  IAccountController,
} from './interfaces.js';

@autoInjectable()
class AccountController extends ApplicationController implements IAccountController {
  public constructor(
    private accountService: AccountService,
    private transactionService: TransactionService,
  ) {
    super();

    this.transactions = this.transactions.bind(this);
  }

  public override async index(_req: AccountIndexRequest, res: AccountIndexResponse, next: NextFunction): Promise<void> {
    const {
      user: { _id: user },
    } = res.locals;

    try {
      const accounts = await this.accountService.all(user);

      res.status(200).json({
        response: ResponseStatus.SUCCESS,
        id: _.isEmpty(accounts) ? AccountResponseIds.NO_ACCOUNTS_RECORDS : AccountResponseIds.ACCOUNTS_RECORDS,
        accounts,
      });
    } catch (error) {
      next(error);
    }
  }

  public override async show(
    { params }: AccountShowRequest,
    res: AccountShowResponse,
    next: NextFunction,
  ): Promise<void> {
    const { id } = params;

    try {
      const account = await this.accountService.id(id);

      res.status(200).json({
        response: ResponseStatus.SUCCESS,
        id: _.isEmpty(account) ? AccountResponseIds.NO_ACCOUNT_RECORD : AccountResponseIds.ACCOUNT_RECORD,
        account,
      });
    } catch (error) {
      next(error);
    }
  }

  public async transactions(
    { params }: AccountTransactionsRequest,
    res: AccountTransactionsResponse,
    next: NextFunction,
  ): Promise<void> {
    const { id } = params;

    try {
      const transactions = await this.transactionService.all(id);

      res.status(200).json({
        response: ResponseStatus.SUCCESS,
        id: _.isEmpty(transactions)
          ? AccountResponseIds.NO_TRANSACTIONS_RECORDS
          : AccountResponseIds.TRANSACTIONS_RECORDS,
        transactions,
      });
    } catch (error) {
      next(error);
    }
  }

  public override async create(
    { body }: AccountCreateRequest,
    res: AccountCreateResponse,
    next: NextFunction,
  ): Promise<void> {
    const {
      user: { _id: user },
    } = res.locals;

    try {
      const account = await this.accountService.create({ ...body, user });

      res.status(201).json({
        response: ResponseStatus.SUCCESS,
        id: AccountResponseIds.CREATED_ACCOUNT_RECORD,
        account,
      });
    } catch (error) {
      next(error);
    }
  }

  public override async update(
    { params, body }: AccountUpdateRequest,
    res: AccountUpdateResponse,
    next: NextFunction,
  ): Promise<void> {
    const { id } = params;
    const {
      user: { _id: user },
    } = res.locals;

    try {
      const account = await this.accountService.update(id, { ...body, user });

      res.status(200).json({
        response: ResponseStatus.SUCCESS,
        id: AccountResponseIds.UPDATED_ACCOUNT_RECORD,
        account,
      });
    } catch (error) {
      next(error);
    }
  }

  public override async destroy(
    { params }: AccountDeleteRequest,
    res: AccountDeleteResponse,
    next: NextFunction,
  ): Promise<void> {
    const { id } = params;

    try {
      await this.accountService.delete(id);
      await this.transactionService.deleteAll(id);

      res.status(204).json({
        response: ResponseStatus.SUCCESS,
        id: AccountResponseIds.DELETED_ACCOUNT_RECORD,
      });
    } catch (error) {
      next(error);
    }
  }
}

export default container.resolve(AccountController);
