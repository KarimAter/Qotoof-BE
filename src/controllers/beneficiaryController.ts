/* eslint-disable @typescript-eslint/naming-convention */
import { NextFunction, Request, Response } from 'express';
import { validationResult } from 'express-validator';
import { Beneficiary } from '../models/beneficiary';
import prismaClient from '../utils/databaseConnector';
import prismaOperation from '../utils/helperFunctions';
import ValidationError from '../middleware/Errors/InvalidRequestError';

const getBeneficiaries = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const result = await prismaOperation(
    () => prismaClient.beneficiary.findMany({}),
    // prismaClient.expense.aggregate({
    //   _sum: { amount: true },
    // }),
    res,
    next,
  );
  req.body = result;
  next();
};

const getBeneficiary = async (
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
        prismaClient.beneficiary.findUnique({
          where: { id },
          include: {
            Expense: {
              select: {
                donationCategory: { select: { name: true } },
                expenseCategory: { select: { name: true } },
                amount: true,
                status: { select: { name: true } },
              },
            },
            _count: true,
          },
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
const postBeneficiary = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const errors = validationResult(req);
  const {
    shortName,
    firstName,
    lastName,
    fullName,
    age,
    maritalStatus,
    address,
  } = req.body as Beneficiary;
  try {
    if (!errors.isEmpty()) {
      throw new ValidationError('Invalid input', errors);
    }

    const result = await prismaOperation(
      () =>
        prismaClient.beneficiary.create({
          data: {
            shortName,
            firstName,
            lastName,
            fullName,
            age,
            maritalStatus,
            address,
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

const editBeneficiary = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const errors = validationResult(req);
  const {
    shortName,
    firstName,
    lastName,
    fullName,
    age,
    maritalStatus,
    address,
  }: Beneficiary = req.body;
  try {
    const { id } = req.params;

    if (!errors.isEmpty()) {
      throw new ValidationError('Invalid input', errors);
    }

    const result = await prismaOperation(
      () =>
        prismaClient.beneficiary.update({
          where: { id },
          data: {
            shortName,
            firstName,
            lastName,
            fullName,
            age,
            maritalStatus,
            address,
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

const deleteBeneficiary = async (
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
        prismaClient.beneficiary.delete({
          where: { id },
          // include: { Expense: true },
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
  getBeneficiaries,
  getBeneficiary,
  postBeneficiary,
  editBeneficiary,
  deleteBeneficiary,
};
