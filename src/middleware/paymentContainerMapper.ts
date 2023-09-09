import { NextFunction, Request, Response } from 'express';
import { IPaymentContainer } from '../models/interfaces';
import { arrayMapper } from '../utils/helperFunctions';

const paymentContainerMapperMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const paymentContainerEntity: IPaymentContainer[] | IPaymentContainer = req.body;

  return res.json(arrayMapper(paymentContainerEntity));
};

export default paymentContainerMapperMiddleware;
