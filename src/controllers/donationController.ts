import { Prisma } from '@prisma/client';
import { NextFunction, Request, Response } from 'express';
import { IDonation } from '../models/donation';
import Donor from '../models/donor';
import { prismaClient } from '../utils/databaseConnector';

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
  // const donorName = await Donor.findByPk(donorId);
  // const donor = donorName ? donorName.name : '';

  // await donorName?.createDonation({
  //   amount,
  //   category,
  //   comment,
  //   date,
  //   payment,
  //   donor,
  //   status,
  // });

  // const ds = await donorName?.getDonations();

  // const x = ds?.[0];
  // console.log('donation[0]:', x);

  // const y = await x?.getDonor();

  // console.log('getDonor:', y);
  // res.json({ message: ` Donation  added successfully` });
};

export default postDonation;
