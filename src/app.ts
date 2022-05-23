import express, {
  NextFunction,
  Request,
  Response,
  ErrorRequestHandler,
} from 'express';

import { ValidationError } from 'express-validator';
import bodyParser from 'body-parser';
import sequelize from './utils/databaseConnector';
import router from './routes/adminRoute';
import Donor from './models/donor';
import Donation from './models/donation';

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

app.use(
  (error: ValidationError, req: Request, res: Response, next: NextFunction) => {
    res.json({ msg: error.msg, field: error.param });
    console.log('App.ts error', error.msg);
  },
);

app.listen(8000);
