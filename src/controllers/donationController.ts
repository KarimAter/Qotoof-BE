import { NextFunction, Request, Response } from 'express';
import { validationResult } from 'express-validator';
import { IDonation } from '../models/donation';
import prismaClient from '../utils/databaseConnector';
import prismaOperation from '../utils/helperFunctions';

const postDonation = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { amount, category, comment, date, payment, status, donor }: IDonation = req.body;
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    next(errors.array());
  } else {
    prismaOperation(
      () =>
        prismaClient.donation.create({
          data: { amount, category, donorId: donor.id },
        }),
      res,
    );
  }
};
const getDonations = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  prismaOperation(
    () => prismaClient.donation.findMany({ include: { donor: true } }),
    res,
  );
};
const getDonation = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;

  prismaOperation(
    () => prismaClient.donation.findMany({ where: { donorId: Number(id) } }),
    res,
  );

  // prismaClient.donation.aggregate({
  // _sum: { amount: true },
  // where: { donorId: Number(id) },
};

const editDonation = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const {
    id,
    amount,
    category,
    comment,
    date,
    donor,
    payment,
    status,
  }: IDonation = req.body;
  const { targetName } = req.body;

  prismaOperation(
    () =>
      prismaClient.donation.update({
        where: { id: Number(id) },
        data: { amount, category, donorId: donor.id },
      }),
    res,
  );
};

const deleteDonation = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { ids } = req.body;

  prismaOperation(
    () =>
      prismaClient.donation.deleteMany({
        where: { id: { in: ids } },
      }),
    res,
  );
};

export {
  postDonation,
  getDonations,
  getDonation,
  editDonation,
  deleteDonation,
};
