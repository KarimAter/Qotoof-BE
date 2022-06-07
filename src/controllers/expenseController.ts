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
        include: { user: true, beneficiary: true },
      }),
    res,
  );
};

const editExpense = async (req: Request, res: Response, next: NextFunction) => {
  const {
    id,
    amount,
    category,
    comment,
    date,
    beneficiary,
    paymentType,
    project,
    user,
    status,
  }: IExpense = req.body;

  prismaOperation(
    () =>
      prismaClient.expense.update({
        where: { id: Number(id) },
        data: {
          amount,
          beneficiaryId: beneficiary.id,
          category,
          comment,
          date,
          paymentType,
          project,
          status,
          userId: user.id,
        },
      }),
    res,
  );
};

const deleteExpense = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { ids } = req.body;

  prismaOperation(
    () =>
      prismaClient.expense.deleteMany({
        where: { id: { in: ids } },
      }),
    res,
  );
};

export { postExpense, getExpenses, editExpense, deleteExpense };
