import { validationResult } from 'express-validator';
import { NextFunction, Request, Response } from 'express';
import { ICategory } from '../models/Category';
import prismaClient from '../utils/databaseConnector';
import prismaOperation from '../utils/helperFunctions';
import ValidationError from '../middleware/Errors/InvalidRequestError';
import { ExpenseCategory } from '../models/expenseCategory';

const getExpenseCategories = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const result = await prismaOperation(
    () => prismaClient.expenseCategory.findMany(),
    res,
    next,
  );

  req.body = result;
  next();
};

const getExpenseCategory = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const errors = validationResult(req);
  const { id } = req.params;
  try {
    if (!errors.isEmpty()) {
      throw new ValidationError('Invalid input', errors);
    }

    const result = await prismaOperation(
      () =>
        prismaClient.expenseCategory.findUnique({
          where: { id: Number(id) },
        }),
      res,
      next,
    );
    req.body = result === null ? [] : result;
    next();
  } catch (error) {
    next(error);
  }
};

const postExpenseCategory = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const errors = validationResult(req);
  const { name, carryover } = req.body as ExpenseCategory;
  try {
    if (!errors.isEmpty()) {
      throw new ValidationError('Invalid input', errors);
    }
    const result = await prismaOperation(
      () =>
        prismaClient.expenseCategory.create({
          data: { name, carryover },
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

const editExpenseCategory = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const errors = validationResult(req);

  const { id, name, carryover } = req.body as ExpenseCategory;
  try {
    if (!errors.isEmpty()) {
      throw new ValidationError('Invalid input', errors);
    }

    const result = await prismaOperation(
      () =>
        prismaClient.expenseCategory.update({
          where: { id: Number(id) },
          data: { name, carryover },
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

const deleteExpenseCategory = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const errors = validationResult(req);
  const { id } = req.params;
  try {
    if (!errors.isEmpty()) {
      throw new ValidationError('Invalid input', errors);
    }

    const result = await prismaOperation(
      () =>
        prismaClient.expenseCategory.delete({
          where: { id: Number(id) },
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

export {
  getExpenseCategories,
  getExpenseCategory,
  postExpenseCategory,
  editExpenseCategory,
  deleteExpenseCategory,
};
