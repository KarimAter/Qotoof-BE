import express, { NextFunction, Request, Response } from 'express';

import { ValidationError } from 'express-validator';
import bodyParser from 'body-parser';
import router from './routes/adminRoute';
import { errorHandler } from './utils/helperFunctions';

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
app.use(router);

app.use(errorHandler);

app.listen(8000);
