import { NextFunction, Request, Response } from 'express';
import Benificiary from '../models/Beneficiary'
const postBeneficiary = (req:Request, res:Response, next:NextFunction) => {
    const beneficiary = new Benificiary(req.body.beneficiaryName);
    beneficiary.save();
    res
      .status(201)
      .json({ message: `Beneficiary is added successfully`, beneficiaryName: beneficiary.benName });
  }


const getBeneficiaries = (req:Request, res:Response, next:NextFunction) => {
  res.status(200).json(Benificiary.fetchCases());
}

  export{ postBeneficiary, getBeneficiaries };
 
