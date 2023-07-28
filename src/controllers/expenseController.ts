import { NextFunction, Request, Response } from 'express';
import { validationResult } from 'express-validator';
import prismaClient from '../utils/databaseConnector';
import prismaOperation from '../utils/helperFunctions';
import { Expense } from '../models/expense';
import ValidationError from '../middleware/Errors/InvalidRequestError';

const postExpense = async (req: Request, res: Response, next: NextFunction) => {
  const {
    date,
    amount,
    donationCategory,
    expenseCategory,
    comment,
    paymentType,
    project,
    status,
    user,
    beneficiary,
  }: Expense = req.body;

  const errors = validationResult(req);
  try {
    if (!errors.isEmpty()) {
      throw new ValidationError('Invalid input', errors);
    }
    const result = await prismaOperation(
      () =>
        prismaClient.expense.create({
          data: {
            date,
            amount,
            comment,
            payment_type: paymentType,
            project,
            status,
            donation_category_id: donationCategory.id,
            expense_category_id: expenseCategory.id,
            user_id: user.id,
            beneficiary_id: beneficiary.id,
          },
          include: {
            donation_category: true,
            expense_category: true,
            user: true,
            beneficiary: true,
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
};
const getExpenses = async (req: Request, res: Response, next: NextFunction) => {
  const result = await prismaOperation(
    () =>
      prismaClient.expense.findMany({
        // include: { referral: { select: { short_name: true } } },
        include: {
          // donation_category: { select: { id: true, name: true } },
          // donor: { select: { id: true, short_name: true } },
          donation_category: true,
          expense_category: true,
          user: true,
          beneficiary: true,
        },
      }),
    res,
    next,
  );
  req.body = result;
  next();
};

const getExpense = async (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  const { id } = req.params;
  try {
    if (!errors.isEmpty()) {
      throw new ValidationError('Invalid input', errors);
    }

    const result = await prismaOperation(
      () => prismaClient.expense.findUnique({ where: { id } }),
      res,
      next,
    );
    req.body = result === null ? [] : result;
    next();
  } catch (error) {
    next(error);
  }

  // prismaClient.donation.aggregate({
  // _sum: { amount: true },
  // where: { donorId: Number(id) },
};

const editExpense = async (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);

  const {
    id,
    amount,
    expenseCategory,
    donationCategory,
    comment,
    date,
    beneficiary,
    paymentType,
    project,
    user,
    status,
  }: Expense = req.body;

  try {
    if (!errors.isEmpty()) {
      throw new ValidationError('Invalid input', errors);
    }

    const result = await prismaOperation(
      () =>
        prismaClient.expense.update({
          where: { id: String(id) },
          data: {
            amount,
            beneficiary_id: beneficiary.id,
            donation_category_id: donationCategory.id,
            expense_category_id: expenseCategory.id,
            comment,
            date,
            payment_type: paymentType,
            project,
            status,
            user_id: user.id,
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
};

const deleteExpense = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { id } = req.params;
  const errors = validationResult(req);
  try {
    if (!errors.isEmpty()) {
      throw new ValidationError('Invalid input', errors);
    }

    const result = await prismaOperation(
      () =>
        prismaClient.expense.deleteMany({
          where: { id },
        }),
      res,
      next,
    );
    req.body = result;
    next();
  } catch (error) {
    next(error);
  }
};

export { postExpense, getExpenses, editExpense, deleteExpense, getExpense };
