import { NextFunction, Request, Response } from 'express';
import { validationResult } from 'express-validator';
import { Referral } from '../models/referral';
import prismaClient from '../utils/databaseConnector';
import prismaOperation from '../utils/helperFunctions';
import ValidationError from '../middleware/Errors/InvalidRequestError';

const postReferral = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const errors = validationResult(req);

  const { shortName, firstName, lastName } = req.body as Referral;
  try {
    if (!errors.isEmpty()) {
      throw new ValidationError('Invalid input', errors);
    }

    const result = await prismaOperation(
      () =>
        prismaClient.referral.create({
          data: {
            short_name: shortName,
            first_name: firstName,
            last_name: lastName,
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

const getReferrals = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const result = await prismaOperation(
    () =>
      prismaClient.referral.findMany({ include: { referred_donors: true } }),
    res,
    next,
  );
  req.body = result;
  next();
};
const getReferral = async (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  const { id } = req.params;
  try {
    if (!errors.isEmpty()) {
      throw new ValidationError('Invalid input', errors);
    }
    const result = await prismaOperation(
      () => prismaClient.referral.findUnique({ where: { id: Number(id) } }),
      res,
      next,
    );
    req.body = result === null ? [] : result;
    next();
  } catch (error) {
    next(error);
  }
};

const deleteReferral = async (
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
        prismaClient.referral.delete({
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

const editReferral = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const errors = validationResult(req);

  const { id, shortName, firstName, lastName } = req.body as Referral;
  try {
    if (!errors.isEmpty()) {
      throw new ValidationError('Invalid input', errors);
    }

    const result = await prismaOperation(
      () =>
        prismaClient.referral.update({
          where: { id },
          data: {
            short_name: shortName,
            first_name: firstName,
            last_name: lastName,
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

export {
  postReferral,
  getReferral,
  getReferrals,
  deleteReferral,
  editReferral,
};
