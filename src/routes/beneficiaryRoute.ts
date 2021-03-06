import { Router } from 'express';
import { ValidationChain, body } from 'express-validator';
import {
  deleteBeneficiary,
  editBeneficiary,
  getBeneficiaries,
  getBeneficiary,
  postBeneficiary,
} from '../controllers/beneficiaryController';
import isAuthenticated from '../middleware/is-authenticated';

const benRouter = Router();

// const path= require('path');
// const beneficiaryController = require('../controllers/beneficiaryController');
// const postFamily = require('../controllers/beneficiaryController');

// creating a new beneficiary
function beneficiaryValidation(): ValidationChain[] {
  return [
    body('beneficiaryName')
      .exists()
      .notEmpty()
      .withMessage('Please enter a user name')
      .isLength({ min: 3 })
      .withMessage('short name'),
  ];
}

benRouter
  .get('/:id', isAuthenticated, getBeneficiary)
  .get('/', isAuthenticated, getBeneficiaries)
  .post('/', isAuthenticated, beneficiaryValidation(), postBeneficiary)
  .put('/', isAuthenticated, editBeneficiary)
  .delete('/', isAuthenticated, deleteBeneficiary);

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
