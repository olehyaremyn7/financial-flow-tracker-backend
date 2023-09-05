import { NextFunction, Request, Response } from 'express';
import { AnyZodObject } from 'zod';

import { AsyncMiddleware } from '../../interfaces/common.js';
import { ErrorService } from '../../services/common/ErrorService.js';

export const validateResource =
  (schema: AnyZodObject): AsyncMiddleware =>
  async ({ body, params, query, cookies }: Request, _res: Response, next: NextFunction): Promise<void> => {
    try {
      await schema.parseAsync({
        body,
        params,
        query,
        cookies,
      });

      next();
    } catch (error) {
      next(ErrorService.handleValidationError(error));
    }
  };
