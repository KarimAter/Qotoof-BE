import { NextFunction, Request, Response } from 'express';
import { validationResult } from 'express-validator';
import prismaClient from '../utils/databaseConnector';
import { IUser } from '../models/user';
import prismaOperation from '../utils/helperFunctions';

const postUser = async (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  const { name, email, password, role } = req.body as IUser;
  if (!errors.isEmpty()) {
    next(errors.array());
  } else {
    prismaOperation(
      () => prismaClient.user.create({ data: { name, role, password } }),
      res,
    );
  }
};
const getUsers = async (req: Request, res: Response, next: NextFunction) => {
  // const errors = validationResult(req);
  // const { name, email, password, role } = req.body as IUser;
  // if (!errors.isEmpty()) {
  //   next(errors.array());
  // } else {
  prismaOperation(() => prismaClient.user.findMany(), res);
  // }
};

export { postUser, getUsers };
