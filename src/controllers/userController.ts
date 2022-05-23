import { NextFunction, Request, Response } from 'express';
import { Prisma } from '@prisma/client';
import prismaClient from '../utils/databaseConnector';
import { IUser } from '../models/user';
import prismaOperation from '../utils/helperFunctions';

const postUser = async (req: Request, res: Response, next: NextFunction) => {
  const { name, email, password, role } = req.body as IUser;

  prismaOperation(
    () => prismaClient.user.create({ data: { name, role } }),
    res,
  );
};

export default postUser;

// const usrS = await prismaClient.user.findMany({
//   include: { Expense: true },
// });
//
