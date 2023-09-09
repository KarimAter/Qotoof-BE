import { NextFunction, Request, Response } from 'express';
import { ITransactionType } from '../models/interfaces';
import { arrayMapper } from '../utils/helperFunctions';

const transactionTypeMapperMapperMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const transactionTypeEntity: ITransactionType[] | ITransactionType = req.body;

  return res.json(arrayMapper(transactionTypeEntity));
};

export default transactionTypeMapperMapperMiddleware;
