import { Router } from 'express';
import path from 'path';
import {
  postBeneficiary,
  getBeneficiaries,
  editBeneficiary,
  deleteBeneficiary,
} from '../controllers/beneficiaryController';

const router = Router();

// const path= require('path');
// const beneficiaryController = require('../controllers/beneficiaryController');
// const postFamily = require('../controllers/beneficiaryController');

// creating a new beneficiary
router.post('/addBenefciary', postBeneficiary);

// Editing an existing  beneficiary
router.put('/editBeneficiary/:beneficiaryName', editBeneficiary);
// Deleting an existing  beneficiary
router.delete('/deleteBeneficiary/:beneficiaryName', deleteBeneficiary);
// get the beneficiary list
router.get('/beneficiaryList', getBeneficiaries);

router.get('/favicon.ico', (req, res) => {
  res.sendStatus(204);
});

router.use('/file', (req, res) => {
  console.log(req.body);
  res.send(`<html><h4>File Page</h4></html>`);
});

router.use('/', (req, res) => {
  // res.setHeader('Content-Type','application/json')
  // res.sendFile(path.join(__dirname,'../','files','lav3.jpg'))
  // gets the root directory
  res.sendFile(path.join(path.join(__dirname), '../', 'files', 'lav3.jpg'));
});

export default router;
