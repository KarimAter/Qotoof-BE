import { NextFunction, Request, Response } from 'express';
import { IExpenseCategory } from '../models/interfaces';
import { expenseCategoryMapper } from '../models/expenseCategory';

const expenseCategoryMapperMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const expenseCategoryEntity: IExpenseCategory[] | IExpenseCategory = req.body;

  return res.json(
    expenseCategoryMapper(
      Array.isArray(expenseCategoryEntity)
        ? expenseCategoryEntity
        : [expenseCategoryEntity],
    ),
  );
};

export default expenseCategoryMapperMiddleware;
