import { NextFunction, Request, Response } from 'express';
import { referralMapper } from '../models/referral';
import { IReferral } from '../models/interfaces';

const referralMapperMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const referralEntity: IReferral[] | IReferral = req.body;

  return res.json(
    referralMapper(
      Array.isArray(referralEntity) ? referralEntity : [referralEntity],
    ),
  );
};

export default referralMapperMiddleware;
