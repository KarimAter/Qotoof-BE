import { NextFunction, Request, Response } from 'express';
import { IExpense } from '../models/interfaces';
import { arrayMapper } from '../utils/helperFunctions';

const expenseMapperMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const expenseEntity: IExpense[] | IExpense = req.body;
  return res.json(
    arrayMapper(expenseEntity),
  );
};

export default expenseMapperMiddleware;
