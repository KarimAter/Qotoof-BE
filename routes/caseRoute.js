const express = require('express')
const router = express.Router();
const path= require('path');
const caseController = require('../controllers/caseController');
// const postFamily = require('../controllers/caseController');



router.post("/case", caseController.postCase);
router.get("/cases", caseController.getCases);

router.get('/favicon.ico',(req,res,next)=>{
    res.sendStatus(204);
})

router.use('/file',(req,res,next)=>{
    console.log(req.body)
    res.send(`<html><h2>File Page</h2></html>`)
})

router.use("/", (req, res, next) => {
  // res.setHeader('Content-Type','application/json')
  // res.sendFile(path.join(__dirname,'../','files','lav3.jpg'))
  // gets the root directory
  res.sendFile(path.join(path.dirname(require.main.filename),'files','lav3.jpg'))
});

module.exports = router;