import { Prisma } from '@prisma/client';
import { NextFunction, Request, Response } from 'express';
import { IDonation } from '../models/donation';
import prismaClient from '../utils/databaseConnector';
import prismaOperation from '../utils/helperFunctions';

const postDonation = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { donation, donorId } = req.body as {
    donation: IDonation;
    donorId: number;
  };
  const { amount, category, comment, date, payment, status } = donation;

  prismaOperation(
    () =>
      prismaClient.donation.create({
        data: { amount, category, donorId },
      }),
    res,
  );
};

export default postDonation;
