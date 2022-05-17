import { NextFunction, Request, Response } from 'express';
import Beneficiary from '../models/Beneficiary'
const getBeneficiaries = (req:Request, res:Response, next:NextFunction) => {
  res.status(200).json(Beneficiary.fetchCases());
}
const postBeneficiary = (req:Request, res:Response, next:NextFunction) => {
    const beneficiary = new Beneficiary(req.body.beneficiaryName);
    beneficiary.save();
    res
      .status(201)
      .json({ message: `Beneficiary is added successfully`, beneficiaryName: beneficiary.name });
  }
  
const editBeneficiary = (req:Request, res:Response, next:NextFunction) => {

 const currentName = req.params.beneficiaryName;
 const ben = req.body as Beneficiary;
 const targetName = ben.name;
 Beneficiary.editBeneficiary(currentName,targetName);
 res.status(201).json({ message: `Name edited to ${targetName}` });

}


const deleteBeneficiary = (req:Request, res:Response, next:NextFunction) => {

  const currentName = req.params.beneficiaryName;
  Beneficiary.deleteBeneficiary(currentName);
  res.status(201).json({ message: `${currentName} deleted!` });
 }


  export{ postBeneficiary, getBeneficiaries,editBeneficiary,deleteBeneficiary };
 
