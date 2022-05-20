import { Router } from 'express';
import path from 'path';
// import getBeneficiaries from '../controllers/beneficiaryController';
import {
  deleteBeneficiary,
  editBeneficiary,
  getBeneficiaries,
  postBeneficiary,
} from '../controllers/beneficiaryController';

const benRouter = Router();

// const path= require('path');
// const beneficiaryController = require('../controllers/beneficiaryController');
// const postFamily = require('../controllers/beneficiaryController');

// creating a new beneficiary
benRouter
  .post('/', postBeneficiary)
  .get('/', getBeneficiaries)
  .put('/', editBeneficiary)
  .delete('/', deleteBeneficiary);

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
