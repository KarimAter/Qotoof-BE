import { NextFunction, Request, Response } from 'express';
import { validationResult } from 'express-validator';
import prismaClient from '../utils/databaseConnector';
import { IUser } from '../models/user';
import prismaOperation from '../utils/helperFunctions';

const postUser = async (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  const { name, email, password, role } = req.body as IUser;
  console.log('Log1', errors);
  console.log('error array check', errors.array(), errors.isEmpty());
  if (!errors.isEmpty()) {
    const error = errors.array()[0];
    // const e = new Error(error);
    next(...errors.array());
    // next(errors.array());
    // throw error;
  } else {
    prismaOperation(
      () => prismaClient.user.create({ data: { name, role } }),
      res,
    );
  }
};

export default postUser;

// const usrS = await prismaClient.user.findMany({
//   include: { Expense: true },
// });
//
