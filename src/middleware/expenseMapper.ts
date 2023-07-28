import { NextFunction, Request, Response } from 'express';
import { IExpense } from '../models/interfaces';
import { expenseMapper } from '../models/expense';

const expenseMapperMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const expenseEntity: IExpense[] | IExpense = req.body;
  return res.json(
    expenseMapper(
      Array.isArray(expenseEntity) ? expenseEntity : [expenseEntity],
    ),
  );
};

export default expenseMapperMiddleware;
