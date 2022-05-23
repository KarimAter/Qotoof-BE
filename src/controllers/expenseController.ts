import { NextFunction, Request, Response } from 'express';
import { IBeneficiary } from '../models/beneficiary';
import { IExpense } from '../models/expense';
import { IUser } from '../models/user';
import prismaClient from '../utils/databaseConnector';
import prismaOperation from '../utils/helperFunctions';

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
    () => prismaClient.expense.create({
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

export default postExpense;
