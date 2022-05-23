import { NextFunction, Request, Response } from 'express';
import { IDonor } from '../models/donor';
import prismaClient from '../utils/databaseConnector';

const postDonor = async (req: Request, res: Response, next: NextFunction) => {
  const { name, referral } = req.body as IDonor;
  try {
    const donor = await prismaClient.donor.create({
      data: { name, referral: referral.name },
      // const donors = await prismaClient.donor.findMany({
      //   include: { Donation: true },
    });
    res.json(donor);
  } catch (error) {
    console.log(error);
    res.json(error);
  }
};

export default postDonor;
