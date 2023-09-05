import { NextFunction, Request, Response } from 'express';
import _ from 'lodash';

import { ApplicationErrors, ErrorResponse, ResponseStatus, Unknowable } from '../../interfaces/common.js';
import { ApplicationError } from '../../models/common/ApplicationError.js';
import { logMessage } from '../../utils/logger.js';

export const errorHandler = (
  error: Unknowable<ApplicationError>,
  _req: Request,
  res: Response<ErrorResponse>,
  _next: NextFunction,
): void => {
  if (error instanceof ApplicationError) {
    const { status, message } = error;

    logMessage(message, 'error');

    res.status(status).json(_.omit(error, 'status'));

    return;
  }

  const { message: errorMessage } = error as Error;
  const message = errorMessage ?? error;

  logMessage(message, 'error');

  res.status(500).json({
    response: ResponseStatus.ERROR,
    id: ApplicationErrors.SERVER_ERROR,
    message,
  });
};
