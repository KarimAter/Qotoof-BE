/* eslint-disable @typescript-eslint/no-explicit-any */
import { Prisma } from '@prisma/client';
import { ErrorRequestHandler, NextFunction, Response } from 'express';
import { Result, ValidationError } from 'express-validator';

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
  errors: ValidationError[],
  req,
  res,
  next,
) => {
  res.json({
    errors,
    // msg: `${errors[0].msg} ${errors[1].msg}`,
    // field: errors[0].param,
  });

  console.log('App error', errors);
};

export default prismaOperation;
