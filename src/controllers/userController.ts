/* eslint-disable import/no-named-default */
import { NextFunction, Request, Response } from 'express';
import { validationResult } from 'express-validator';
import { sign } from 'jsonwebtoken';
import { User } from '@prisma/client';
import { default as bcrypt } from 'bcryptjs';
import prismaClient from '../utils/databaseConnector';
import { IUser } from '../models/user';
import prismaOperation from '../utils/helperFunctions';

const postUser = async (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    next(errors.array());
  } else {
    const { name, email, password, role } = req.body as IUser;
    if (password) {
      try {
        const hashedPassword = await bcrypt.hash(password, 12);
        prismaOperation(
          () =>
            prismaClient.user.create({
              data: { name, email, role, password: hashedPassword },
            }),
          res,
          next,
        );
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
  prismaOperation(
    () =>
      prismaClient.user.findMany({
        select: { id: true, name: true, email: true, role: true },
      }),
    res,
    next,
  );
  // }
};
const getUser = async (req: Request, res: Response, next: NextFunction) => {
  // const errors = validationResult(req);
  // const { name, email, password, role } = req.body as IUser;
  // if (!errors.isEmpty()) {
  //   next(errors.array());
  // } else {
  const { id, email, password } = req.body;
  let loadedUser: User | null;
  prismaClient.user
    .findFirst({ where: { email } })
    .then((user) => {
      if (!user) {
        const error = new Error('no user');
        throw error;
      }
      loadedUser = user;
      return loadedUser.password
        ? bcrypt.compare(password, loadedUser?.password)
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
          name: loadedUser?.name,
          role: loadedUser?.role,
        },
      });
    })
    .catch((error) => next(error));
  // }
};

export { postUser, getUsers, getUser };
