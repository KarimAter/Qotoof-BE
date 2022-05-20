/*
tsc --init
yarn add @types/node --dev
yarn add @types/express --dev
*/

import express from 'express';
import bodyParser from 'body-parser';
import benRouter from './routes/beneficiaryRoute';
import userRoute from './routes/userRoute';
import sequelize from './utils/databaseConnector';
import Beneficiary from './models/Beneficiary';

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

sequelize
  .sync()
  .then(() => {
    app.listen(8000);
  })
  .catch((err) => console.log(err));
app.use('/user', userRoute);
app.use('/beneficiary', benRouter);
