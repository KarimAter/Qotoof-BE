import { Result, ValidationError } from 'express-validator';
import AppError from './AppError';

class InvalidRequestError extends AppError {
  errors: Result<ValidationError>;

  constructor(public message: string, errors: Result<ValidationError>) {
    super('Bad Request::', message, 400);
    this.errors = errors;
    Object.setPrototypeOf(this, InvalidRequestError.prototype);
  }
}

export default InvalidRequestError;
