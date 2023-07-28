import { NextFunction, Request, Response } from 'express';
import { validationResult } from 'express-validator';
import prismaClient from '../utils/databaseConnector';
import prismaOperation from '../utils/helperFunctions';
import ValidationError from '../middleware/Errors/InvalidRequestError';
import { DonationCategory } from '../models/donationCategory';

const getDonationCategories = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const result = await prismaOperation(
    () => prismaClient.donationCategory.findMany(),
    res,
    next,
  );
  req.body = result;
  next();
};

const getDonationCategory = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const errors = validationResult(req);
  const { id } = req.params;
  try {
    if (!errors.isEmpty()) {
      throw new ValidationError('Invalid input', errors);
    }

    const result = await prismaOperation(
      () =>
        prismaClient.donationCategory.findUnique({
          where: { id: Number(id) },
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

const postDonationCategory = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const errors = validationResult(req);
  const { name, carryover } = req.body as DonationCategory;
  try {
    if (!errors.isEmpty()) {
      throw new ValidationError('Invalid input', errors);
    }
    const result = await prismaOperation(
      () =>
        prismaClient.donationCategory.create({
          data: { name, carryover },
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

const editDonationCategory = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const errors = validationResult(req);

  const { id, name, carryover } = req.body as DonationCategory;
  try {
    if (!errors.isEmpty()) {
      throw new ValidationError('Invalid input', errors);
    }

    const result = await prismaOperation(
      () =>
        prismaClient.donationCategory.update({
          where: { id: Number(id) },
          data: { name, carryover },
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

const deleteDonationCategory = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const errors = validationResult(req);
  const { id } = req.params;
  try {
    if (!errors.isEmpty()) {
      throw new ValidationError('Invalid input', errors);
    }

    const result = await prismaOperation(
      () =>
        prismaClient.donationCategory.delete({
          where: { id: Number(id) },
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

export {
  getDonationCategories,
  getDonationCategory,
  postDonationCategory,
  editDonationCategory,
  deleteDonationCategory,
};
