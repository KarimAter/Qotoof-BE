import { error } from 'console';
import { NextFunction, Request, Response } from 'express';
import { IBeneficiary } from '../models/beneficiary';
import { IExpense } from '../models/expense';
import { IUser } from '../models/user';
import prismaClient from '../utils/databaseConnector';
import prismaOperation from '../utils/helperFunctions';

const postExpense = async (req: Request, res: Response, next: NextFunction) => {
  const { amount, incategory, outcategory, user, beneficiary }: IExpense = req.body;
  console.log(beneficiary);

  try {
    prismaOperation(
      () =>
        prismaClient.expense.create({
          data: {
            amount,
            incategory,
            outcategory,
            userId: user.id,
            beneficiaryId: beneficiary.id,
            beneficiaryName: beneficiary.name,
          },
        }),
      res,
      next,
    );
  } catch {
    next(error);
  }
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
    next,
  );
};

const editExpense = async (req: Request, res: Response, next: NextFunction) => {
  const {
    id,
    amount,
    incategory,
    outcategory,
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
        where: { id: String(id) },
        data: {
          amount,
          beneficiaryId: beneficiary.id,
          incategory,
          outcategory,
          comment,
          date,
          paymentType,
          project,
          status,
          userId: user.id,
        },
      }),
    res,
    next,
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
    next,
  );
};

export { postExpense, getExpenses, editExpense, deleteExpense };
