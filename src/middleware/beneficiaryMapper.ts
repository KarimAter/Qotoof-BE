import { NextFunction, Request, Response } from 'express';
// import { beneficiaryMapper } from '../models/beneficiary';
import { IBeneficiary } from '../models/interfaces';
import { arrayMapper } from '../utils/helperFunctions';

const beneficiaryMapperMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const beneficiaryEntity: IBeneficiary[] | IBeneficiary = req.body;

  return res.json(arrayMapper(beneficiaryEntity));
};

export default beneficiaryMapperMiddleware;
