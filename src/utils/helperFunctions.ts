/* eslint-disable consistent-return */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Prisma } from '@prisma/client';
import { ErrorRequestHandler, NextFunction, Response } from 'express';
import { ValidationError } from 'express-validator';
import { JsonWebTokenError } from 'jsonwebtoken';

async function prismaOperation(
  callback: () => Promise<any>,
  res: Response,
  next: NextFunction,
) {
  try {
    return res.json(await callback());
  } catch (error) {
    if (next) next(error);
  }
}
export async function prismaQuery(callback: () => Promise<any>) {
  try {
    const result = await callback();
    return result;
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      console.log(`${error.message}`);
      return error.message;
    }
    return error;
  }
}

// Todo:update for Prisma errors
export const errorHandler: ErrorRequestHandler = (
  errors: ValidationError[] | Error | JsonWebTokenError,
  req,
  res,
  next,
) => {
  let msg;
  if (errors instanceof JsonWebTokenError) {
    res.statusCode = 401;
    msg = errors.message;
  } else if (errors instanceof Error) {
    msg = errors.message;
    res.statusCode = msg === 'Not authenticated' ? 401 : 403;
  } else {
    res.statusCode = 400;
    msg = errors.map((err) => err.msg);
  }
  res.json({
    msg,
  });
  console.log('App error', msg);
};

export default prismaOperation;
