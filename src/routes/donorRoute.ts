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
  // validateRelationalId('referral', true),
  // TODO: Library for validating relational CUIDs
];

donorRouter.use(isAuthenticated);

donorRouter
  .post('/', postDonor)
  .get('/', isAuthorized, getDonors)
  .get('/:id', isAuthorized, getDonor)
  .put('/:id', editDonor)
  .delete('/:id', deleteDonor);
donorRouter.use(donorMapperMiddleware);

export default donorRouter;
