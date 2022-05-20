/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable no-param-reassign */
import { NextFunction, Request, Response } from 'express';
import { where } from 'sequelize/types';
import Beneficiary, { IBeneficiary } from '../models/Beneficiary';

const getBeneficiaries = (req: Request, res: Response, next: NextFunction) => {
  Beneficiary.findAll()
    .then((bens) => {
      res.json(bens);
    })
    .catch((err) => console.log(err));
  console.log(Beneficiary.getTableName());
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

const postBeneficiary = (req: Request, res: Response, next: NextFunction) => {
  const { beneficiaryName } = req.body as IBeneficiary;
  Beneficiary.create({ beneficiaryName })
    .then((resaaa) => {
      console.log(resaaa);
      res.json({ msg: `${beneficiaryName} added successfully` });
    })
    .catch((err) => console.log(err));
};

const editBeneficiary = (req: Request, res: Response, next: NextFunction) => {
  const { id, beneficiaryName } = req.body as IBeneficiary;
  const { targetName } = req.body;

  Beneficiary.findByPk(id)
    .then((ben) => {
      if (ben) {
        ben.beneficiaryName = targetName;
        ben.save();
        res.json({
          beneficiary: ben,
          message: `${beneficiaryName} has been updated to ${targetName}`,
        });
      } else {
        res.json({ message: `Not found` });
      }
    })
    .catch((err) => console.log(err));
};

const deleteBeneficiary = (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.body as IBeneficiary;
  Beneficiary.findByPk(id)
    .then((ben) => {
      ben
        ? res.json({
            beneficiary: ben,
            message: `${ben?.beneficiaryName} has been deleted`,
          })
        : res.json({ message: `Not found` });
      ben?.destroy();
    })
    .catch((err) => console.log(err));
};

export {
  getBeneficiaries,
  getBeneficiary,
  postBeneficiary,
  editBeneficiary,
  deleteBeneficiary,
};
