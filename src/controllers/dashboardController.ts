import { NextFunction, Request, Response } from 'express';
import { get } from 'https';
import { IBeneficiary } from '../models/beneficiary';
import { IExpense } from '../models/expense';
import { IUser } from '../models/user';
import prismaClient from '../utils/databaseConnector';
import prismaOperation, { prismaQuery } from '../utils/helperFunctions';

const getCashIn = async (req: Request, res: Response, next: NextFunction) => {
  const {
    user,
    beneficiary,
    expense,
  }: {
    user: IUser;
    beneficiary: IBeneficiary;
    expense: IExpense;
  } = req.body;

  const cashIn = await prismaQuery(() =>
    prismaClient.donation.groupBy({
      by: ['category'],
      _sum: { amount: true },
    }));
  const cashOut = await prismaQuery(() =>
    prismaClient.expense.groupBy({
      by: ['category'],
      _sum: { amount: true },
    }));
  console.log(cashIn, cashOut);
};

export default getCashIn;
