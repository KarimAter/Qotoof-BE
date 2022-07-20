/* eslint-disable @typescript-eslint/no-explicit-any */
import { Prisma } from '@prisma/client';
import { ErrorRequestHandler, Response } from 'express';
import { ValidationError } from 'express-validator';
import { JsonWebTokenError } from 'jsonwebtoken';

async function prismaOperation(callback: () => Promise<any>, res: Response) {
  try {
    return res.json(await callback());
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      console.log(`${error.message}`);
      return res.json(error.message);
    }
    return res.json(error);
  }
}

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
    res.statusCode = 403;
    msg = errors.message;
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
