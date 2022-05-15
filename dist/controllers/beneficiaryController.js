"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getBeneficiaries = exports.postBeneficiary = void 0;
const Beneficiary_1 = __importDefault(require("../models/Beneficiary"));
const postBeneficiary = (req, res, next) => {
    const beneficiary = new Beneficiary_1.default(req.body.beneficiaryName);
    beneficiary.save();
    res
        .status(201)
        .json({ message: `Beneficiary is added successfully`, beneficiaryName: beneficiary.benName });
};
exports.postBeneficiary = postBeneficiary;
const getBeneficiaries = (req, res, next) => {
    res.status(200).json(Beneficiary_1.default.fetchCases());
};
exports.getBeneficiaries = getBeneficiaries;
