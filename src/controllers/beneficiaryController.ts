/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable no-param-reassign */
import { NextFunction, Request, Response } from 'express';
import Beneficiary, { IBeneficiary } from '../models/beneficiary';
import { prismaClient } from '../utils/databaseConnector';

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

  // Beneficiary.findAll()
  //   .then((bens) => {
  //     res.json(bens);
  //   })
  //   .catch((err) => console.log(err));
  // console.log(Beneficiary.getTableName());
};

const getBeneficiary = (req: Request, res: Response, next: NextFunction) => {
  const { id, beneficiaryName } = req.body as IBeneficiary;

  Beneficiary.findByPk(id)
    .then((beneficiary) => {
      res.json({
        beneficiary,
        message: `${beneficiary?.beneficiaryName} is fetched`,
      });
    })
    .catch((err) => console.log(err));
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
      where: { id },
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

  // Beneficiary.findByPk(id)
  //   .then((ben) => {
  //     ben
  //       ? res.json({
  //           beneficiary: ben,
  //           message: `${ben?.beneficiaryName} has been deleted`,
  //         })
  //       : res.json({ message: `Not found` });
  //     ben?.destroy();
  //   })
  //   .catch((err) => console.log(err));
};

export {
  getBeneficiaries,
  getBeneficiary,
  postBeneficiary,
  editBeneficiary,
  deleteBeneficiary,
};
