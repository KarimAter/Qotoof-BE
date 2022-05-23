/* eslint-disable @typescript-eslint/no-explicit-any */
import { Expense, Prisma } from '@prisma/client';
import { NextFunction, Request, Response } from 'express';
import { IBeneficiary } from '../models/beneficiary';
import { IExpense } from '../models/expense';
import { IUser } from '../models/user';
import prismaClient from '../utils/databaseConnector';

async function prismaOperation(
  callback: (x: object) => Promise<any>,
  res: Response,
  data: object,
) {
  try {
    return res.json(await callback(data));
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      console.log(`${error.message}`);
      return res.json(error.message);
    }
    return res.json(error);
  }
}

const postExpense = async (req: Request, res: Response, next: NextFunction) => {
  const {
    user,
    beneficiary,
    expense,
  }: {
    user: IUser;
    beneficiary: IBeneficiary;
    expense: IExpense;
  } = req.body;
  const { amount, category } = expense;

  prismaOperation(
    () => {
      const lll = prismaClient.expense.create({
        data: {
          amount,
          category,
          userId: user.id,
          beneficiaryId: beneficiary.id,
        },
      });
      return lll;
    },
    res,
    {
      amount,
      category,
      user,
      beneficiary,
    },
  );
  // const exp = prismaClient.expense.create({
  //   data: {
  //     amount,
  //     category,
  //     userId: user.id,
  //     beneficiaryId: beneficiary.id,
  //   },
  // });

  // prismaOperation(async () => {
  //   try {
  //     return res.json(exp);
  //   } catch (error) {
  //     if (error instanceof Prisma.PrismaClientKnownRequestError) {
  //       console.log(`${error.message}`);
  //     }
  //     return res.json(error);
  //   }
  // });
  // const cb = (requestObject: object) =>
  // function (_requestObject: any): Response<any, Record<string, any>>
};

export default postExpense;
