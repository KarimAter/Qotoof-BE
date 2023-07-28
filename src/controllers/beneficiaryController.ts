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
    () =>
      prismaClient.beneficiary.findMany({
        include: {
          Expense: true,
        },
      }),
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
            short_name: shortName,
            first_name: firstName,
            last_name: lastName,
            full_name: fullName,
            age,
            marital_status: maritalStatus,
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
    id,
    shortName,
    firstName,
    lastName,
    fullName,
    age,
    maritalStatus,
    address,
  }: Beneficiary = req.body;
  try {
    if (!errors.isEmpty()) {
      throw new ValidationError('Invalid input', errors);
    }

    const result = await prismaOperation(
      () =>
        prismaClient.beneficiary.update({
          where: { id: Number(id) },
          data: {
            short_name: shortName,
            first_name: firstName,
            last_name: lastName,
            full_name: fullName,
            age,
            marital_status: maritalStatus,
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
          where: { id: Number(id) },
          include: { Expense: true },
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
