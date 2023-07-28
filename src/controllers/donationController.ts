import { NextFunction, Request, Response } from 'express';
import { validationResult } from 'express-validator';
// eslint-disable-next-line import/no-named-as-default
import Donation from '../models/donation';
import prismaClient from '../utils/databaseConnector';
import prismaOperation from '../utils/helperFunctions';
import ValidationError from '../middleware/Errors/InvalidRequestError';

const postDonation = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { date, amount, donationCategory, donor }: Donation = req.body;

  const errors = validationResult(req);
  try {
    if (!errors.isEmpty()) {
      throw new ValidationError('Invalid input', errors);
    }

    const result = await prismaOperation(
      () =>
        prismaClient.donation.create({
          data: {
            date: new Date(date),
            amount,
            donation_category_id: donationCategory.id,
            donor_id: donor.id,
          },
          include: { donation_category: true, donor: true },
        }),
      res,
      next,
    );
    req.body = result;
    next();
  } catch (error) {
    next(error);
  }
};
const getDonations = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const result = await prismaOperation(
    () =>
      prismaClient.donation.findMany({
        // include: { referral: { select: { short_name: true } } },
        include: {
          // donation_category: { select: { id: true, name: true } },
          // donor: { select: { id: true, short_name: true } },
          donation_category: true,
          donor: true,
        },
      }),
    res,
    next,
  );
  req.body = result;
  next();
};
const getDonation = async (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  const { id } = req.params;
  try {
    if (!errors.isEmpty()) {
      throw new ValidationError('Invalid input', errors);
    }

    const result = await prismaOperation(
      () => prismaClient.donation.findUnique({ where: { id } }),
      res,
      next,
    );
    req.body = result === null ? [] : result;
    next();
  } catch (error) {
    next(error);
  }

  // prismaClient.donation.aggregate({
  // _sum: { amount: true },
  // where: { donorId: Number(id) },
};

const editDonation = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const errors = validationResult(req);

  const { id, date, amount, donationCategory, donor }: Donation = req.body;

  try {
    if (!errors.isEmpty()) {
      throw new ValidationError('Invalid input', errors);
    }

    const result = await prismaOperation(
      () =>
        prismaClient.donation.update({
          where: { id },
          data: {
            date,
            amount,
            donation_category_id: donationCategory.id,
            donor_id: donor.id,
          },
        }),
      res,
      next,
    );
    req.body = result;
    next();
  } catch (error) {
    next(error);
  }
};

const deleteDonation = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { id } = req.params;
  const errors = validationResult(req);
  try {
    if (!errors.isEmpty()) {
      throw new ValidationError('Invalid input', errors);
    }

    const result = await prismaOperation(
      () =>
        prismaClient.donation.delete({
          where: { id },
        }),
      res,
      next,
    );
    req.body = result;
    next();
  } catch (error) {
    next(error);
  }

  // prismaOperation(
  //   () =>
  //     prismaClient.donation.deleteMany({
  //       where: { id: { in: ids } },
  //     }),
  //   res,
  //   next,
  // );
};

export {
  postDonation,
  getDonations,
  getDonation,
  editDonation,
  deleteDonation,
};
