import { NextFunction, Request, Response } from 'express';
import { validationResult } from 'express-validator';
import { Donor } from '../models/donor';
import prismaClient from '../utils/databaseConnector';
import prismaOperation from '../utils/helperFunctions';
import ValidationError from '../middleware/Errors/InvalidRequestError';

const postDonor = async (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);

  const { shortName, firstName, lastName, fullName, referral } = req.body as Donor;
  try {
    if (!errors.isEmpty()) {
      throw new ValidationError('Invalid input', errors);
    }

    const result = await prismaOperation(
      () =>
        // prismaClient.$queryRaw`SELECT * FROM "donor" WHERE "shortName" = '${shortName}`,
      prismaClient.donor.create({
        data: {
          shortName,
          firstName,
          lastName,
          fullName,
          referralId: referral.id,
        },
        include: { referral: { select: { shortName: true } } },
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

const getDonors = async (req: Request, res: Response, next: NextFunction) => {
  const result = await prismaOperation(
    () =>
      prismaClient.donor.findMany({
        include: { referral: { select: { shortName: true } } },
      }),
    res,
    next,
  );
  req.body = result;
  next();
};
const getDonor = async (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  const { id } = req.params;
  try {
    if (!errors.isEmpty()) {
      throw new ValidationError('Invalid input', errors);
    }

    const result = await prismaOperation(
      () =>
        prismaClient.donor.findUnique({
          where: { id },
          include: { referral: { select: { shortName: true } } },
        }),
      res,
      next,
    );
    req.body = result === null ? [] : result;
    next();
  } catch (error) {
    next(error);
  }
};

const deleteDonor = async (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  const { id } = req.params;
  try {
    if (!errors.isEmpty()) {
      throw new ValidationError('Invalid input', errors);
    }

    const result = await prismaOperation(
      () =>
        prismaClient.donor.delete({
          where: { id },
          include: { referral: { select: { shortName: true } } },
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

const editDonor = async (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  const { id } = req.params;

  const { shortName, firstName, lastName, fullName, referral } = req.body as Donor;
  try {
    if (!errors.isEmpty()) {
      throw new ValidationError('Invalid input', errors);
    }

    const result = await prismaOperation(
      () =>
        prismaClient.donor.update({
          where: { id },
          data: {
            shortName,
            firstName,
            lastName,
            fullName,
            referralId: referral.id,
          },
          include: { referral: { select: { shortName: true } } },
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

export { postDonor, getDonors, getDonor, deleteDonor, editDonor };
