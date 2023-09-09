import { NextFunction, Request, Response } from 'express';
import { IReferral } from '../models/interfaces';
import { arrayMapper } from '../utils/helperFunctions';

const referralMapperMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const referralEntity: IReferral[] | IReferral = req.body;

  return res.json(
    arrayMapper(referralEntity),
  );
};

export default referralMapperMiddleware;
