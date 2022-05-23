/* eslint-disable @typescript-eslint/no-unused-expressions */
import { NextFunction, Request, Response } from 'express';
import { Prisma } from '@prisma/client';
import prismaClient from '../utils/databaseConnector';
import { IUser } from '../models/user';

const postUser = async (req: Request, res: Response, next: NextFunction) => {
  const {
 name, email, password, role,
} = req.body as IUser;

  try {
    const usr = await prismaClient.user.create({
      data: { name, role },
    });
    // const usrS = await prismaClient.user.findMany({
    //   include: { Expense: true },
    // });
    res.json(usr);
    console.log(usr);
  } catch (error) {
    res.json(error);
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      console.log(`${error.message}`);
    }
  }
};

export default postUser;
