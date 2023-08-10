/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable consistent-return */
import { Prisma } from '@prisma/client';
import { NextFunction, Response } from 'express';
import DatabaseError from '../middleware/Errors/DatabaseError';

// TODO: update for rest of Prisma errors
// TODO: Refactor to map errors to human readable messages using errorResponse object

const prismaOperation = async <T>(
  callback: () => Promise<T>,
  res: Response,
  next: NextFunction,
): Promise<T | void> => {
  try {
    const result = await callback();
    return result;
  } catch (error: Error | any) {
    console.error(error);
    next(new DatabaseError(error.code, error.meta?.cause));
  }
};
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

export const capitalize = (str:string) => {
  if (typeof str !== 'string' || str.length === 0) return str;

  return str.charAt(0).toUpperCase() + str.slice(1);
};

export default prismaOperation;
