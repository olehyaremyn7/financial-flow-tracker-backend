import { AuthenticationResponseIds } from '../../controllers/authorization/interfaces.js';
import { ApplicationErrors, ResponseStatus, Unknowable, ValidationError } from '../../interfaces/common.js';
import { ApplicationError } from '../../models/common/ApplicationError.js';
import { getMessage } from '../../utils/common.js';
import { IErrorService } from './interfaces.js';

export class ErrorService implements IErrorService {
  public static handleValidationError(error: ValidationError): ApplicationError {
    return new ApplicationError({
      status: 422,
      response: ResponseStatus.ERROR,
      id: ApplicationErrors.VALIDATION_ERROR,
      message: getMessage('common.errors.validation'),
      validation: error,
    });
  }

  public handleUnauthenticated(): never {
    throw new ApplicationError({
      status: 403,
      response: ResponseStatus.ERROR,
      id: AuthenticationResponseIds.UNAUTHENTICATED,
      message: getMessage('common.errors.unauthorized'),
    });
  }

  public handleBadRequest<I = string>(message: string, id: Unknowable<I>): never {
    throw new ApplicationError({
      status: 400,
      response: ResponseStatus.ERROR,
      id,
      message,
    });
  }

  public handleServerError(error: unknown): never {
    const { message: errorMessage } = error as Error;
    const message = errorMessage ?? error;

    throw new ApplicationError({
      status: 500,
      response: ResponseStatus.ERROR,
      id: ApplicationErrors.SERVER_ERROR,
      message,
    });
  }
}
