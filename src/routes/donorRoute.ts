import { Router } from 'express';
import { ValidationChain, body, param } from 'express-validator';
import {
  postDonor,
  getDonors,
  deleteDonor,
  editDonor,
  getDonor,
} from '../controllers/donorController';
import isAuthenticated from '../middleware/is-authenticated';
import { isAuthorized } from '../middleware/is-authorized';
import donorMapperMiddleware from '../middleware/donorMapper';
import {
  validateRequiredName,
  validateOptionalName,
  validateId,
  validateRelationalId,
} from '../validation/customValidators';

const donorRouter = Router();
const validateDonor = (): ValidationChain[] => [
  validateRequiredName('shortName', 'Donor name'),
  validateOptionalName('firstName', 'Donor first name'),
  validateOptionalName('lastName', 'Donor last name'),
  validateOptionalName('fullName', 'Donor full name'),
  validateRelationalId('referral'),
];

donorRouter.options('/', (req, res) => {
  // Set the necessary CORS headers for the OPTIONS request
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Methods',
    'OPTIONS, GET, POST, PUT, DELETE',
  );
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.sendStatus(200);
});
donorRouter.use(isAuthenticated);

donorRouter
  .post('/', validateDonor(), postDonor)
  .put('/', validateDonor(), editDonor)
  .get('/', isAuthorized, getDonors)
  .get('/:id', isAuthorized, validateId('Donor'), getDonor)
  .delete('/:id', validateId('Donor'), deleteDonor);
donorRouter.use(donorMapperMiddleware);

export default donorRouter;
