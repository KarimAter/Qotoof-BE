/* eslint-disable import/no-named-default */
import { NextFunction, Request, Response } from 'express';
import { validationResult } from 'express-validator';
import { sign } from 'jsonwebtoken';
import { default as bcrypt } from 'bcryptjs';
import prismaClient from '../utils/databaseConnector';
import prismaOperation from '../utils/helperFunctions';
import { User, userRoleMapper } from '../models/user';
import { IUser } from '../models/interfaces';

const postUser = async (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    next(errors.array());
  } else {
    const { name, email, password, role } = req.body as User;

    if (password) {
      try {
        const hashedPassword = await bcrypt.hash(password, 12);
        const result = await prismaOperation(
          () =>
            prismaClient.user.create({
              data: {
                short_name: name,
                email,
                role: userRoleMapper(role),
                password: hashedPassword,
              },
            }),
          res,
          next,
        );
        req.body = result;
        next();
      } catch (error) {
        next(error);
      }
    }
  }
};
const getUsers = async (req: Request, res: Response, next: NextFunction) => {
  // const errors = validationResult(req);
  // const { name, email, password, role } = req.body as IUser;
  // if (!errors.isEmpty()) {
  //   next(errors.array());
  // } else {
  const result = await prismaOperation(
    () =>
      prismaClient.user.findMany({
        select: { id: true, short_name: true, email: true, role: true },
      }),
    res,
    next,
  );

  req.body = result;
  next();
  // }
};
const getUser = async (req: Request, res: Response, next: NextFunction) => {
  // const errors = validationResult(req);
  // const { name, email, password, role } = req.body as IUser;
  // if (!errors.isEmpty()) {
  //   next(errors.array());
  // } else {
  const { id, email, password } = req.body;
  let loadedUser: IUser | null;
  prismaClient.user
    .findFirst({ where: { email } })
    .then((user) => {
      if (!user) {
        const error = new Error('no user');
        throw error;
      }
      loadedUser = user as unknown as IUser;
      return loadedUser.password
        ? bcrypt.compare(password, loadedUser.password)
        : false;
    })
    .then((isEqual) => {
      if (!isEqual) {
        const error = new Error('wrong pass');
        throw error;
      }
      const token = sign(
        {
          email: loadedUser?.email,
          userId: loadedUser?.id,
          role: loadedUser?.role,
        },
        'secret',
        { expiresIn: '1h' },
      );

      res.json({
        message: 'success',
        token,
        user: {
          id: loadedUser?.id,
          name: loadedUser?.short_name,
          role: loadedUser?.role,
        },
      });
    })
    .catch((error) => next(error));
  // }
};

export { postUser, getUsers, getUser };
