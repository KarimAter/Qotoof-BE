import { NextFunction, Request, Response } from 'express';
import { ITransaction } from '../models/interfaces';
import { arrayMapper } from '../utils/helperFunctions';

const transactionMapperMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const transactionEntity: ITransaction[] | ITransaction = req.body;
  return res.json(arrayMapper(transactionEntity));
};

export default transactionMapperMiddleware;
