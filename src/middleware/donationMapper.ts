import { NextFunction, Request, Response } from 'express';
import { IDonation } from '../models/interfaces';
import { donationMapper } from '../models/donation';

const donationMapperMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const donationEntity: IDonation[] | IDonation = req.body;
  return res.json(
    donationMapper(
      Array.isArray(donationEntity) ? donationEntity : [donationEntity],
    ),
  );
};

export default donationMapperMiddleware;
