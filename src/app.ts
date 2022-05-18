/*
tsc --init
yarn add @types/node --dev
yarn add @types/express --dev
*/

import express from 'express';
import bodyParser from 'body-parser';
import adminRoute from './routes/beneficiaryRoute';

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

// A Must to parse JSON payloads
app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  // seems to be allowing GET and POST by default
  res.setHeader('Access-Control-Allow-Methods', '*');
  res.setHeader('Access-Control-Allow-Headers', '*');
  next();
});

app.use('/beneficiary', adminRoute);

app.listen(8000);
