import { Prisma } from '@prisma/client';
import { NextFunction, Request, Response } from 'express';
import { IDonation } from '../models/donation';
import prismaClient from '../utils/databaseConnector';

const postDonation = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { donation, donorId } = req.body as {
    donation: IDonation;
    donorId: number;
  };
  const {
 amount, category, comment, date, payment, status,
} = donation;

  try {
    const don = await prismaClient.donation.create({
      data: { amount, category, donorId },
    });
    res.json(don);
  } catch (error) {
    res.json(error);
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      // The .code property can be accessed in a type-safe manner
      if (error.code === 'P2003') {
        console.log('Foreign key constraint failed on the field: `donorId`');
      }
    }
  }
};

export default postDonation;
