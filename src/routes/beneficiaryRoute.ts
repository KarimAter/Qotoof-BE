import { Router } from 'express';
const router = Router();
import path from 'path';
// const path= require('path');
// const beneficiaryController = require('../controllers/beneficiaryController');
 import { postBeneficiary, getBeneficiaries } from '../controllers/beneficiaryController'
// const postFamily = require('../controllers/beneficiaryController');


// creating a new beneficiary
router.post("/addBenefciary", postBeneficiary);
// get the beneficiary list
router.get("/beneficiaryList", getBeneficiaries);

router.get('/favicon.ico',(req,res,next)=>{
    res.sendStatus(204);
})

router.use('/file',(req,res,next)=>{
    console.log(req.body)
    res.send(`<html><h4>File Page</h4></html>`)
})

router.use("/", (req, res, next) => {
  // res.setHeader('Content-Type','application/json')
  // res.sendFile(path.join(__dirname,'../','files','lav3.jpg'))
  // gets the root directory
  res.sendFile(path.join(path.join(__dirname),'../','files','lav3.jpg'))
});

export default router;