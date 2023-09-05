import 'reflect-metadata';

import { NextFunction } from 'express';
import _ from 'lodash';
import { autoInjectable, container } from 'tsyringe';

import { ResponseStatus } from '../../interfaces/common.js';
import { TransactionService } from '../../services/transaction/TransactionService.js';
import { ApplicationController } from '../ApplicationController/ApplicationController.js';
import {
  TransactionCreateRequest,
  TransactionCreateResponse,
  TransactionDeleteRequest,
  TransactionDeleteResponse,
  TransactionResponseIds,
  TransactionShowRequest,
  TransactionShowResponse,
  TransactionUpdateRequest,
  TransactionUpdateResponse,
} from './interfaces.js';

@autoInjectable()
class TransactionController extends ApplicationController {
  public constructor(private transactionService: TransactionService) {
    super();
  }

  public override async show(
    { params }: TransactionShowRequest,
    res: TransactionShowResponse,
    next: NextFunction,
  ): Promise<void> {
    const { id } = params;

    try {
      const transaction = await this.transactionService.id(id);

      res.status(200).json({
        response: ResponseStatus.SUCCESS,
        id: _.isEmpty(transaction)
          ? TransactionResponseIds.NO_TRANSACTION_RECORD
          : TransactionResponseIds.TRANSACTION_RECORD,
        transaction,
      });
    } catch (error) {
      next(error);
    }
  }

  public override async create(
    { body }: TransactionCreateRequest,
    res: TransactionCreateResponse,
    next: NextFunction,
  ): Promise<void> {
    const {
      user: { _id: user },
    } = res.locals;

    try {
      const transaction = await this.transactionService.create({ ...body, user });

      res.status(201).json({
        response: ResponseStatus.SUCCESS,
        id: TransactionResponseIds.CREATED_TRANSACTION_RECORD,
        transaction,
      });
    } catch (error) {
      next(error);
    }
  }

  public override async update(
    { params, body }: TransactionUpdateRequest,
    res: TransactionUpdateResponse,
    next: NextFunction,
  ): Promise<void> {
    const { id } = params;
    const {
      user: { _id: user },
    } = res.locals;

    try {
      const transaction = await this.transactionService.update(id, { ...body, user });

      res.status(200).json({
        response: ResponseStatus.SUCCESS,
        id: TransactionResponseIds.UPDATED_TRANSACTION_RECORD,
        transaction,
      });
    } catch (error) {
      next(error);
    }
  }

  public override async destroy(
    { params }: TransactionDeleteRequest,
    res: TransactionDeleteResponse,
    next: NextFunction,
  ): Promise<void> {
    const { id } = params;

    try {
      await this.transactionService.delete(id);

      res.status(204).json({
        response: ResponseStatus.SUCCESS,
        id: TransactionResponseIds.DELETED_TRANSACTION_RECORD,
      });
    } catch (error) {
      next(error);
    }
  }
}

export default container.resolve(TransactionController);
