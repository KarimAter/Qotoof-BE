import { NextFunction, Request, Response } from 'express';
import { validationResult } from 'express-validator';
import { IBeneficiary } from '../models/beneficiary';
import prismaClient from '../utils/databaseConnector';
import prismaOperation from '../utils/helperFunctions';

const getBeneficiaries = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  prismaOperation(
    () =>
      prismaClient.beneficiary.findMany({
        include: {
          Expense: true,
        },
      }),
    res,
    next,
  );
};

const getBeneficiary = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { id, name } = req.params;

  prismaOperation(
    () =>
      prismaClient.beneficiary.findUnique({
        where: { id: Number(id) },
      }),
    res,
    next,
  );
};

const postBeneficiary = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const errors = validationResult(req);
  const { name } = req.body as IBeneficiary;

  if (!errors.isEmpty()) {
    next(errors.array());
  } else {
    prismaOperation(
      () =>
        prismaClient.beneficiary.create({
          data: { name },
        }),
      res,
      next,
    );
  }
};

const editBeneficiary = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { id }: IBeneficiary = req.body;
  const { targetName } = req.body;

  prismaOperation(
    () =>
      prismaClient.beneficiary.update({
        where: { id: Number(id) },
        data: { name: targetName },
      }),
    res,
    next,
  );
};

const deleteBeneficiary = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { id } = req.body as IBeneficiary;

  prismaOperation(
    () =>
      prismaClient.beneficiary.delete({
        where: { id },
        include: { Expense: true },
      }),
    res,
    next,
  );
};

export {
  getBeneficiaries,
  getBeneficiary,
  postBeneficiary,
  editBeneficiary,
  deleteBeneficiary,
};
