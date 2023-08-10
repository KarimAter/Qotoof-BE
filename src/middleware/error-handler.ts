import { ErrorRequestHandler, NextFunction, Response } from 'express';
import { JsonWebTokenError } from 'jsonwebtoken';
import JwtError from './Errors/JwtError';
import AppError from './Errors/AppError';
import InvalidRequestError from './Errors/InvalidRequestError';
import DatabaseError from './Errors/DatabaseError';

const errorHandler: ErrorRequestHandler = (error: AppError, req, res, next) => {
  switch (true) {
    case error instanceof JwtError:
      res.status(error.statusCode).json({ error });
      break;

    case error instanceof InvalidRequestError:
      res
        .status(error.statusCode)
        // TODO: refactor errors array later
        .json({ error });
      break;

    case error instanceof DatabaseError:
      res.status(error.statusCode).json({ error });
      break;

    default:
      res.status(500).json({ error });
      break;
  }
};

export default errorHandler;
