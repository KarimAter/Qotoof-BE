import { NextFunction, Request, Response } from 'express';
import { IDonation } from '../models/interfaces';
import { arrayMapper } from '../utils/helperFunctions';

const donationMapperMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const donationEntity: IDonation[] | IDonation = req.body;
  return res.json(arrayMapper(donationEntity));
};

export default donationMapperMiddleware;
