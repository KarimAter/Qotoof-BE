import { validationResult } from 'express-validator';
import { NextFunction, Request, Response } from 'express';
import cuid from 'cuid';
import prismaClient from '../utils/databaseConnector';
import prismaOperation from '../utils/helperFunctions';
import ValidationError from '../middleware/Errors/InvalidRequestError';
import { Category } from '../models/category';

const getSubCategories = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const result = await prismaOperation(
    () =>
      prismaClient.category.findMany({
        where: { parentId: { not: '' } },
        distinct: ['parentId'],
      }),
    res,
    next,
  );

  req.body = result;
  next();
};
const getCategories = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const result = await prismaOperation(
    () =>
      prismaClient.category.findMany({
        select: {
          name: true,
          carryover: true,
          inOnly: true,
          level: true,
          parentId: true,
          Donation: { select: { amount: true, paymentContainer: true } },
          ExpenseFrom: {
            select: {
              amount: true,
              paymentContainer: { select: { name: true } },
            },
          },
          ExpenseTo: {
            select: {
              amount: true,
              paymentContainer: { select: { name: true } },
            },
          },
        },
      }),
    res,
    next,
  );

  req.body = result;
  next();
};

const getCategory = async (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  const { id } = req.params;
  try {
    if (!errors.isEmpty()) {
      throw new ValidationError('Invalid input', errors);
    }

    const result = await prismaOperation(
      () =>
        prismaClient.category.findUnique({
          where: { id },
          select: {
            name: true,
            carryover: true,
            inOnly: true,
            level: true,
            parentId: true,
            Donation: { select: { amount: true, paymentContainer: true } },
            // current_transactions: true,
            // target_transactions: true,
            ExpenseFrom: {
              select: {
                amount: true,
                paymentContainer: { select: { name: true } },
              },
            },
            ExpenseTo: {
              select: {
                amount: true,
                paymentContainer: { select: { name: true } },
              },
            },
          },
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

const postCategory = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const errors = validationResult(req);
  const { name, carryover, inOnly, level, parentId } = req.body as Category;
  const id = cuid();
  const dParentId = !level || level === 0 ? id : parentId;
  try {
    if (!errors.isEmpty()) {
      throw new ValidationError('Invalid input', errors);
    }
    const result = await prismaOperation(
      () =>
        prismaClient.category.create({
          data: { id, name, carryover, inOnly, parentId: dParentId, level },
          select: {
            name: true,
            carryover: true,
            inOnly: true,
            level: true,
            parentId: true,
            Donation: { select: { amount: true, paymentContainer: true } },
            // current_transactions: true,
            // target_transactions: true,
            ExpenseFrom: {
              select: {
                amount: true,
                paymentContainer: { select: { name: true } },
              },
            },
            ExpenseTo: {
              select: {
                amount: true,
                paymentContainer: { select: { name: true } },
              },
            },
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

const editCategory = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const errors = validationResult(req);
  const { id } = req.params;
  const { name, carryover, inOnly, level, parentId } = req.body as Category;
  try {
    if (!errors.isEmpty()) {
      throw new ValidationError('Invalid input', errors);
    }

    const result = await prismaOperation(
      () =>
        prismaClient.category.update({
          where: { id },
          data: { name, carryover, inOnly, level, parentId },
          select: {
            name: true,
            carryover: true,
            inOnly: true,
            level: true,
            parentId: true,
            Donation: { select: { amount: true, paymentContainer: true } },
            // current_transactions: true,
            // target_transactions: true,
            ExpenseFrom: {
              select: {
                amount: true,
                paymentContainer: { select: { name: true } },
              },
            },
            ExpenseTo: {
              select: {
                amount: true,
                paymentContainer: { select: { name: true } },
              },
            },
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

const deleteCategory = async (
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
        prismaClient.category.delete({
          where: { id },
          select: {
            name: true,
            carryover: true,
            inOnly: true,
            level: true,
            parentId: true,
            Donation: { select: { amount: true, paymentContainer: true } },
            // current_transactions: true,
            // target_transactions: true,
            ExpenseFrom: {
              select: {
                amount: true,
                paymentContainer: { select: { name: true } },
              },
            },
            ExpenseTo: {
              select: {
                amount: true,
                paymentContainer: { select: { name: true } },
              },
            },
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

export {
  getSubCategories,
  getCategories,
  getCategory,
  postCategory,
  editCategory,
  deleteCategory,
};
