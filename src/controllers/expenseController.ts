import { NextFunction, Request, Response } from 'express';
import { IBeneficiary } from '../models/beneficiary';
import { IExpense } from '../models/expense';
import { IUser } from '../models/user';
import prismaClient from '../utils/databaseConnector';
import prismaOperation from '../utils/helperFunctions';

const postExpense = async (req: Request, res: Response, next: NextFunction) => {
  const { amount, category, user, beneficiary }: IExpense = req.body;

  prismaOperation(
    () =>
      prismaClient.expense.create({
        data: {
          amount,
          category,
          userId: user.id,
          beneficiaryId: beneficiary.id,
        },
      }),
    res,
  );
};
const getExpenses = async (req: Request, res: Response, next: NextFunction) => {
  const {
    user,
    beneficiary,
    expense,
  }: {
    user: IUser;
    beneficiary: IBeneficiary;
    expense: IExpense;
  } = req.body;

  prismaOperation(
    () =>
      prismaClient.expense.findMany({
        select: {
          id: true,
          date: true,
          amount: true,
          category: true,
          beneficiary: { select: { name: true } },
          user: { select: { name: true } },
          paymentType: true,
          status: true,
          project: true,
        },
      }),
    res,
  );
};

export { postExpense, getExpenses };
