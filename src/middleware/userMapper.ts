import { NextFunction, Request, Response } from 'express';
import { IUser } from '../models/interfaces';
import { userMapper } from '../models/user';

const userMapperMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const userEntity: IUser[] | IUser = req.body;

  return res.json(
    userMapper(Array.isArray(userEntity) ? userEntity : [userEntity], false),
  );
};

export default userMapperMiddleware;
