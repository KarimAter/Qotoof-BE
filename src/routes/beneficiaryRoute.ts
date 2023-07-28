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
  validateAge,
  validateId,
  validateOneOf,
  validateOptionalName,
  validateOptionalString,
  validateRequiredName,
} from '../validation/customValidators';

const benRouter = Router();

// const path= require('path');
// const beneficiaryController = require('../controllers/beneficiaryController');
// const postFamily = require('../controllers/beneficiaryController');

// creating a new beneficiary

function beneficiaryValidation(): ValidationChain[] {
  return [
    validateRequiredName('shortName', 'Beneficiary name'),
    validateOptionalName('firstName', 'Beneficiary first name'),
    validateOptionalName('lastName', 'Beneficiary last name'),
    validateOptionalName('fullName', 'Beneficiary full name'),
    validateAge('age', 'Age'),
    validateOneOf('maritalStatus', 'Marital Status', [
      'Single',
      'Married',
      'Divorced',
      'Widowed',
    ]),
    validateOptionalString('address', 'Address'),
  ];
}

const validateBeneficiaryId = (): ValidationChain[] => [
  param('id')
    // .not()
    // .isString()
    // .withMessage('id must not be a string')
    // .bail()
    .isNumeric()
    .withMessage('Beneficiary ID must be a numeric value'),
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
  .get('/:id', validateId('Beneficiary Id'), getBeneficiary)
  .get('/', getBeneficiaries)
  .post('/', beneficiaryValidation(), postBeneficiary)
  .put('/', beneficiaryValidation(), editBeneficiary)
  .delete('/:id', validateId('Beneficiary Id'), deleteBeneficiary);

benRouter.use(beneficiaryMapperMiddleware);

// Editing an existing  beneficiary
// benRouter.put('/:beneficiaryName', editBeneficiary);
// // Deleting an existing  beneficiary
// benRouter.delete('/:beneficiaryName', deleteBeneficiary);
// get the beneficiary list
// benRouter.get('/beneficiaryList', getBeneficiaries);

// benRouter.get('/favicon.ico', (req, res) => {
//   res.sendStatus(204);
// });

// benRouter.use('/file', (req, res) => {
//   console.log(req.body);
//   res.send(`<html><h4>File Page</h4></html>`);
// });

// benRouter.use('/', (req, res) => {
//   // res.setHeader('Content-Type','application/json')
//   // res.sendFile(path.join(__dirname,'../','files','lav3.jpg'))
//   // gets the root directory
//   res.sendFile(path.join(path.join(__dirname), '../', 'files', 'lav3.jpg'));
// });

export default benRouter;

// body('firstName')
//   .if(body('firstName').exists().withMessage('First name is required'))
//   .notEmpty()
//   .withMessage('First name cannot be empty')
//   .bail()
//   .isAlpha()
//   .withMessage('First name must be alphabetic')
//   .bail()
//   .isLength({ min: 3 })
//   .withMessage('First name must be at least 3 characters long'),
// body('lastName')
//   .if(body('lastName').exists().withMessage('Last name is required'))
//   .notEmpty()
//   .withMessage('Last name cannot be empty')
//   .bail()
//   .isAlpha()
//   .withMessage('Last name must be alphabetic')
//   .bail()
//   .isLength({ min: 3 })
//   .withMessage('Last name must be at least 3 characters long'),
// body('fullName')
//   .if(body('fullName').exists().withMessage('Full name is required'))
//   .notEmpty()
//   .withMessage('Full name cannot be empty')
//   .bail()
//   .isAlpha()
//   .withMessage('Full name must be alphabetic')
//   .bail()
//   .isLength({ min: 3 })
//   .withMessage('Full name must be at least 3 characters long'),
// body('age')
//   .if(body('age').exists().withMessage('Age is required'))
//   .notEmpty()
//   .withMessage('Age cannot be empty')
//   .bail()
//   .not()
//   .isString()
//   .withMessage('Age must not be a string')
//   .bail()
//   .isNumeric()
//   .withMessage('Age must be numeric')
//   .bail()
//   .isInt({ min: 7, max: 120 })
//   .withMessage('Age must be between 7 and 120'),
// body('maritalStatus')
//   .if(
//     body('maritalStatus')
//       .exists()
//       .withMessage('Marital Status is required'),
//   )
//   .notEmpty()
//   .withMessage('Marital Status cannot be empty')
//   .bail()
//   .isIn(['Single', 'Married', 'Divorced', 'Widowed'])
//   .withMessage(
//     'Marital Status must be Single, Married, Divorced or Widowed',
//   ),
// body('address')
//   .if(body('address').exists().withMessage('Address is required'))
//   .notEmpty()
//   .withMessage('Address cannot be empty')
//   .bail()
//   .isAlpha()
//   .withMessage('Address must be alphabetic')
//   .bail()
//   .isLength({ min: 3 })
//   .withMessage('Address must be at least 3 characters long'),
