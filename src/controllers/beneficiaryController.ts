import { NextFunction, Request, Response } from 'express';
import Beneficiary from '../models/Beneficiary'
const postBeneficiary = (req:Request, res:Response, next:NextFunction) => {
    const beneficiary = new Beneficiary(req.body.beneficiaryName);
    beneficiary.save();
    res
      .status(201)
      .json({ message: `Beneficiary is added successfully`, beneficiaryName: beneficiary.name });
  }


const getBeneficiaries = (req:Request, res:Response, next:NextFunction) => {
  res.status(200).json(Beneficiary.fetchCases());
}

  export{ postBeneficiary, getBeneficiaries };
 
