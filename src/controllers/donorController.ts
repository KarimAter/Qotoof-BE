import { NextFunction, Request, Response } from 'express';
import { IDonor } from '../models/donor';
import prismaClient from '../utils/databaseConnector';
import prismaOperation from '../utils/helperFunctions';

const postDonor = async (req: Request, res: Response, next: NextFunction) => {
  const { name, referral } = req.body as IDonor;

  prismaOperation(
    () => prismaClient.donor.create({ data: { name, userId: referral.id } }),
    res,
  );
};

const getDonors = async (req: Request, res: Response, next: NextFunction) => {
  const { name, referral } = req.body as IDonor;

  prismaOperation(
    () => prismaClient.donor.findMany({ include: { referral: true } }),
    res,
  );
};

const deleteDonor = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.body as IDonor;

  prismaOperation(
    () =>
      prismaClient.donor.delete({
        where: { id },
      }),
    res,
  );
};

const editDonor = async (req: Request, res: Response, next: NextFunction) => {
  const { id, name, referral } = req.body as IDonor;

  prismaOperation(
    () =>
      prismaClient.donor.update({
        where: { id },
        data: { name, userId: referral.id },
      }),
    res,
  );
};

export { postDonor, getDonors, deleteDonor, editDonor };
