import { Router } from 'express';
import { ValidationChain } from 'express-validator';
import isAuthenticated from '../middleware/is-authenticated';
import {
  editDonationCategory,
  getDonationCategories,
  getDonationCategory,
  postDonationCategory,
  deleteDonationCategory,
} from '../controllers/donationCategoryController';
import {
  validateDecimalRange,
  validateId,
  validateRequiredName,
} from '../validation/customValidators';
import donationCategoryMapperMiddleware from '../middleware/donationCategoryMapper';

const donationCategoryRouter = Router();

const validateDonationCategory = (): ValidationChain[] => [
  validateRequiredName('name', 'Donation Category'),
  validateDecimalRange('carryover', 'Carryover', {
    minimum: -100000,
    maximum: 100000,
  }),
];

donationCategoryRouter.use(isAuthenticated);

donationCategoryRouter
  .get('/', getDonationCategories)
  .post('/', validateDonationCategory(), postDonationCategory)
  .put('/', validateDonationCategory(), editDonationCategory)
  .get('/:id', validateId('Donation category'), getDonationCategory)
  .delete('/:id', validateId('Donation category'), deleteDonationCategory);
donationCategoryRouter.use(donationCategoryMapperMiddleware);

export default donationCategoryRouter;
