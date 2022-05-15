"use strict";
/*
tsc --init
yarn add @types/node --dev
yarn add @types/express --dev
*/
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const beneficiaryRoute_1 = __importDefault(require("./routes/beneficiaryRoute"));
const body_parser_1 = __importDefault(require("body-parser"));
const app = (0, express_1.default)();
app.use(body_parser_1.default.urlencoded({ extended: true }));
// A Must to parse JSON payloads 
app.use(body_parser_1.default.json());
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    // seems to be allowing GET and POST by default
    res.setHeader('Access-Control-Allow-Methods', '*');
    res.setHeader('Access-Control-Allow-Headers', '*');
    next();
});
app.use(beneficiaryRoute_1.default);
app.listen(8000);
