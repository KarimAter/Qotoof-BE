import { NextFunction, Request, Response } from 'express';
import { IDonor } from '../models/donor';
import prismaClient from '../utils/databaseConnector';
import prismaOperation from '../utils/helperFunctions';

const postDonor = async (req: Request, res: Response, next: NextFunction) => {
  const { name, referral } = req.body as IDonor;

  prismaOperation(
    () =>
      prismaClient.donor.create({ data: { name, referral: referral.name } }),
    res,
  );
};

const getDonors = async (req: Request, res: Response, next: NextFunction) => {
  const { name, referral } = req.body as IDonor;

  prismaOperation(() => prismaClient.donor.findMany(), res);
};

export { postDonor, getDonors };
