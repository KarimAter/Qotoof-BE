import { ErrorRequestHandler, NextFunction, Response } from 'express';
import { JsonWebTokenError } from 'jsonwebtoken';
import JwtError from './Errors/JwtError';
import AppError from './Errors/AppError';
import InvalidRequestError from './Errors/InvalidRequestError';
import DatabaseError from './Errors/DatabaseError';

const errorHandler: ErrorRequestHandler = (error: AppError, req, res, next) => {
  let msg;

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
  // if (error instanceof JwtError) {
  //   res.status(error.statusCode).json({ error });
  // }

  // if (error instanceof InvalidRequestError) {
  //   res.status(error.statusCode).json({ error: error.errors });
  // }
  // if (error instanceof DatabaseError) {
  //   res.status(error.statusCode).json({ error });
  // } else res.status(500).json({ error });
  // console.log('Error handler:: ', error);
};

export default errorHandler;

//  else if (errors instanceof Error) {
//   msg = errors.message;
//   if (msg?.includes('database')) res.statusCode = 500;
//   else if (msg === 'Not authenticated') res.statusCode = 401;
//   else res.statusCode = 403;
// } else {
//   res.statusCode = 400;
//   msg = errors.map((err) => err.msg);
// }
// res.json({
//   msg,
// });
