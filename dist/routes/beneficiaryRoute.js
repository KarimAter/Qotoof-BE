"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
const path_1 = __importDefault(require("path"));
// const path= require('path');
// const beneficiaryController = require('../controllers/beneficiaryController');
const beneficiaryController_1 = require("../controllers/beneficiaryController");
// const postFamily = require('../controllers/beneficiaryController');
router.post("/beneficiary", beneficiaryController_1.postBeneficiary);
router.get("/beneficiaryList", beneficiaryController_1.getBeneficiaries);
router.get('/favicon.ico', (req, res, next) => {
    res.sendStatus(204);
});
router.use('/file', (req, res, next) => {
    console.log(req.body);
    res.send(`<html><h1>File Page</h1></html>`);
});
router.use("/", (req, res, next) => {
    // res.setHeader('Content-Type','application/json')
    // res.sendFile(path.join(__dirname,'../','files','lav3.jpg'))
    // gets the root directory
    res.sendFile(path_1.default.join(path_1.default.join(__dirname), '../', 'files', 'lav3.jpg'));
});
exports.default = router;
