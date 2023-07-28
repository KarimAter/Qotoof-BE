import { NextFunction, Request, Response } from 'express';
import { IDonationCategory } from '../models/interfaces';
import { donationCategoryMapper } from '../models/donationCategory';

const donationCategoryMapperMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const donationCategoryEntity: IDonationCategory[] | IDonationCategory = req.body;

  return res.json(
    donationCategoryMapper(
      Array.isArray(donationCategoryEntity)
        ? donationCategoryEntity
        : [donationCategoryEntity],
    ),
  );
};

export default donationCategoryMapperMiddleware;
