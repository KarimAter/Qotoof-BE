/* eslint-disable no-unsafe-optional-chaining */
/* eslint-disable consistent-return */
/* eslint-disable no-underscore-dangle */
import { NextFunction, Request, Response } from 'express';
import {
  CashInType,
  CashOutType,
  categoryCarryover,
} from '../utils/Constants';
import prismaClient from '../utils/databaseConnector';
import { prismaQuery } from '../utils/helperFunctions';

const getCashIn = async (req: Request, res: Response, next: NextFunction) => {
  const cashIn: CashInType[] = await prismaQuery(() =>
    prismaClient.donation.groupBy({
      by: ['category'],
      _sum: { amount: true },
    }));
  const cashOut: CashOutType[] = await prismaQuery(() =>
    prismaClient.expense.groupBy({
      by: ['incategory'],
      _sum: { amount: true },
    }));

  console.log(cashIn, cashOut);

  const inCategories = cashIn.map((i) => i.category);
  const presentCategories = inCategories.concat(
    cashOut.map((o) => o.incategory).filter((x) => !inCategories.includes(x)),
  );

  const result = presentCategories.map((category) => {
    const carryover = categoryCarryover.filter((x) => x.category === category);
    const categoryIncomeBalance = cashIn
      ?.filter((cat) => cat.category === category)
      .map((cat) => cat._sum.amount);
    const categoryExpenseBalance = cashOut
      ?.filter((cat) => cat.incategory === category)
      .map((cat) => cat._sum.amount);

    const inBalance = categoryIncomeBalance.length > 0 ? categoryIncomeBalance[0] : 0;
    const outBalance = categoryExpenseBalance.length > 0 ? categoryExpenseBalance[0] : 0;
    return {
      category,
      balance: inBalance - outBalance + carryover[0].balance,
    };
  });
  console.log(result);
  try {
    return res.json(result);
  } catch (error) {
    if (next) next(error);
  }
};

export default getCashIn;
