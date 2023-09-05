import { ResponseStatus, ValidationError } from '../../interfaces/common.js';
import { IApplicationError } from './interfaces.js';

export class ApplicationError extends Error implements IApplicationError {
  public override message: string;

  public status: number;

  public id: string | unknown;

  public response: ResponseStatus;

  public validation?: ValidationError;

  public constructor({ message, status, id, response, validation }: IApplicationError) {
    super(message);

    this.message = message;
    this.status = status;
    this.id = id;
    this.response = response;
    this.validation = validation;
  }
}
