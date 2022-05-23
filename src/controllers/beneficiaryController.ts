import { NextFunction, Request, Response } from 'express';
import { IBeneficiary } from '../models/beneficiary';
import prismaClient from '../utils/databaseConnector';
import prismaOperation from '../utils/helperFunctions';

const getBeneficiaries = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  prismaOperation(() => prismaClient.beneficiary.findMany(), res);
};

const getBeneficiary = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { id, beneficiaryName } = req.params;

  prismaOperation(
    () =>
      prismaClient.beneficiary.findUnique({
        where: { id: Number(id) },
      }),
    res,
  );
};

const postBeneficiary = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { beneficiaryName } = req.body as IBeneficiary;
  prismaOperation(
    () =>
      prismaClient.beneficiary.create({
        data: { name: beneficiaryName },
      }),
    res,
  );
};

const editBeneficiary = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { id, beneficiaryName }: IBeneficiary = req.body;
  const { targetName } = req.body;

  prismaOperation(
    () =>
      prismaClient.beneficiary.update({
        where: { id: Number(id) },
        data: { name: targetName },
      }),
    res,
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
  );
};

export {
  getBeneficiaries,
  getBeneficiary,
  postBeneficiary,
  editBeneficiary,
  deleteBeneficiary,
};
