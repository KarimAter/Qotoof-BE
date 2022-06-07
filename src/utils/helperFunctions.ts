/* eslint-disable @typescript-eslint/no-explicit-any */
import { Prisma } from '@prisma/client';
import { ErrorRequestHandler, Response } from 'express';
import { ValidationError } from 'express-validator';

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
  errors: ValidationError[] | Error,
  req,
  res,
  next,
) => {
  const msg = errors instanceof Error ? errors.message : errors.map((err) => err.msg);
  res.statusCode = 403;
  res.json({
    msg,
    // error: errors.message,
    // msg: `${errors[0].msg} ${errors[1].msg}`,
    // field: errors[0].param,
  });

  console.log('App error', errors);
};

export default prismaOperation;
