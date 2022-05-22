import { NextFunction, Request, Response } from 'express';
import { IBeneficiary } from '../models/beneficiary';
import prismaClient from '../utils/databaseConnector';

const getBeneficiaries = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const bens = await prismaClient.beneficiary.findMany();
    res.json(bens);
  } catch (error) {
    console.log(error);
  }
};

const getBeneficiary = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { id, beneficiaryName } = req.body as IBeneficiary;

  try {
    const bens = await prismaClient.beneficiary.findUnique({
      where: { id: Number(id) },
    });
    res.json(bens);
  } catch (error) {
    console.log(error);
  }
};

const postBeneficiary = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { beneficiaryName } = req.body as IBeneficiary;
    const ben = await prismaClient.beneficiary.create({
      data: { name: beneficiaryName },
    });
    res.json(ben);
  } catch (error) {
    console.log(error);
  }
};

const editBeneficiary = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { id, beneficiaryName }: IBeneficiary = req.body;
  const { targetName } = req.body;

  try {
    const updatedBen = await prismaClient.beneficiary.update({
      where: { id: Number(id) },
      data: { name: targetName },
    });
    res.json(updatedBen);
  } catch (error) {
    console.log(error);
  }
};

const deleteBeneficiary = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { id } = req.body as IBeneficiary;
  try {
    const ben = await prismaClient.beneficiary.delete({ where: { id } });
    res.json(ben);
  } catch (error) {
    console.log(error);
  }
};

export {
  getBeneficiaries,
  getBeneficiary,
  postBeneficiary,
  editBeneficiary,
  deleteBeneficiary,
};
