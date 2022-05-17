import { NextFunction, Request, Response } from 'express';
import Beneficiary from '../models/Beneficiary'
const getBeneficiaries = (req:Request, res:Response, next:NextFunction) => {
  res.json(Beneficiary.fetchCases());
}
const postBeneficiary = (req:Request, res:Response, next:NextFunction) => {
    const beneficiary = new Beneficiary(req.body.beneficiaryName);
    beneficiary.save();
    res.json({
      message: `Beneficiary is added successfully`,
      beneficiaryName: beneficiary.name,
    });
  }
  
const editBeneficiary = (req:Request, res:Response, next:NextFunction) => {

 const currentName = req.params.beneficiaryName;
 const ben = req.body as Beneficiary;
 const targetName = ben.name;
 const message: string = Beneficiary.editBeneficiary(currentName, targetName);
 res.json({ message: `${message} ${targetName}` });

}


const deleteBeneficiary = (req:Request, res:Response, next:NextFunction) => {

  const currentName = req.params.beneficiaryName;
 const message:string=Beneficiary.deleteBeneficiary(currentName);
  res.json({ message: `${currentName} ${message}!` });
 }


  export{ postBeneficiary, getBeneficiaries,editBeneficiary,deleteBeneficiary };
 
