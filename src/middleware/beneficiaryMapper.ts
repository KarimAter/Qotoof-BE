import { NextFunction, Request, Response } from 'express';
import { beneficiaryMapper } from '../models/beneficiary';
import { IBeneficiary } from '../models/interfaces';

const beneficiaryMapperMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const beneficiaryEntity: IBeneficiary[] | IBeneficiary = req.body;

  return res.json(
    beneficiaryMapper(
      Array.isArray(beneficiaryEntity)
        ? beneficiaryEntity
        : [beneficiaryEntity],
      false,
    ),
  );
};

export default beneficiaryMapperMiddleware;
