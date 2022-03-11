const Beneificiary = require('../models/Beneficiary')
const postBeneficiary = (req, res, next) => {
    const beneficiary = new Beneificiary(req.body.beneficiaryName);
    beneficiary.save();
    res
      .status(201)
      .json({ message: `Beneficiary is added successfully`, beneficiaryName: beneficiary.beneficiaryName });
  }


const getBeneficiaries = (req, res, next) => {
  res.status(200).json(Beneificiary.fetchCases());
}

  module.exports = { postBeneficiary, getBeneficiaries };
 
