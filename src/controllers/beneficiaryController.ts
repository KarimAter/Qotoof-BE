import { NextFunction, Request, Response } from 'express';
import Beneficiary, { IBeneficiary } from '../models/Beneficiary';

const getBeneficiaries = (req: Request, res: Response, next: NextFunction) => {
  // Beneficiary.fetchCases().then(([RowDataPacket]) => res.json(RowDataPacket));
  console.log(Beneficiary.getTableName());
};
const postBeneficiary = (req: Request, res: Response, next: NextFunction) => {
  const { beneficiaryName } = req.body as IBeneficiary;
  Beneficiary.create({ beneficiaryName })
    .then((resaaa) => {
      console.log(resaaa);
      res.json({ msg: `${beneficiaryName} added successfully` });
    })
    .catch((err) => console.log(err));
  // const beneficiary = new Beneficiary(req.body.beneficiaryName);
  // beneficiary
  //   .save()
  //   .then(() => res.json({
  //     message: `Beneficiary is added successfully`,
  //     beneficiaryName: beneficiary.name,
  //   }))
  //   .catch((error) => console.log(error));
};

// const editBeneficiary = (req: Request, res: Response, next: NextFunction) => {
//   const currentName = req.params.beneficiaryName;
//   const ben = req.body as Beneficiary;
//   const targetName = ben.name;
//   const message: string = Beneficiary.editBeneficiary(currentName, targetName);
//   res.json({ message: `${message} ${targetName}` });
// };

// const deleteBeneficiary = (req: Request, res: Response, next: NextFunction) => {
//   const currentName = req.params.beneficiaryName;
//   const message: string = Beneficiary.deleteBeneficiary(currentName);
//   res.json({ message: `${currentName} ${message}!` });
// };
export { getBeneficiaries, postBeneficiary };
// export {
//   postBeneficiary,
//   getBeneficiaries,
//   editBeneficiary,
//   deleteBeneficiary,
// };
