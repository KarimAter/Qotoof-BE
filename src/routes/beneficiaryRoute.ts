import { Router } from 'express';
import { ValidationChain, body, check, param } from 'express-validator';
import {
  deleteBeneficiary,
  editBeneficiary,
  getBeneficiaries,
  getBeneficiary,
  postBeneficiary,
} from '../controllers/beneficiaryController';
import isAuthenticated from '../middleware/is-authenticated';
import beneficiaryMapperMiddleware from '../middleware/beneficiaryMapper';
import {
  validateNumericRange,
  validateId,
  validateOneOf,
  validateOptionalName,
  validateOptionalString,
  validateRequiredName,
} from '../validation/customValidators';

const benRouter = Router();

const beneficiaryValidation = (): ValidationChain[] => [
  validateRequiredName('shortName', 'Beneficiary name'),
  validateOptionalName('firstName', 'Beneficiary first name'),
  validateOptionalName('lastName', 'Beneficiary last name'),
  validateOptionalName('fullName', 'Beneficiary full name'),
  validateNumericRange('age', 'Age', { minimum: 7, maximum: 120 }),
  validateOneOf('maritalStatus', 'Marital Status', [
    'Single',
    'Married',
    'Divorced',
    'Widowed',
  ]),
  validateOptionalString('address', 'Address'),
];
benRouter.options('/', (req, res) => {
  // Set the necessary CORS headers for the OPTIONS request
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Methods',
    'OPTIONS, GET, POST, PUT, DELETE',
  );
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.sendStatus(200);
});
benRouter.use(isAuthenticated);

benRouter
  .get('/:id', validateId('Beneficiary'), getBeneficiary)
  .get('/', getBeneficiaries)
  .post('/', beneficiaryValidation(), postBeneficiary)
  .put('/', beneficiaryValidation(), editBeneficiary)
  .delete('/:id', validateId('Beneficiary'), deleteBeneficiary);

benRouter.use(beneficiaryMapperMiddleware);

export default benRouter;
