import { Router } from 'express';

import { ValidationChain, body, param } from 'express-validator';
import isAuthenticated from '../middleware/is-authenticated';
import {
  editDonationCategory,
  getDonationCategories,
  getDonationCategory,
  postDonationCategory,
  deleteDonationCategory,
} from '../controllers/donationCategoryController';
import donationCategoryMapperMiddleware from '../middleware/donationCategoryMapper';

const donationCategoryRouter = Router();

const validateDonationCategory = (): ValidationChain[] => [
  body('name')
    .exists()
    .withMessage('Donation Category is required')
    .bail()
    .notEmpty()
    .withMessage('Donation Category cannot be empty')
    .bail()
    .isAlpha()
    .withMessage('Donation Category must be alphabetic')
    .bail()
    .isLength({ min: 3 })
    .withMessage('Donation Category must be at least 3 characters long'),
  body('carryover')
    .exists()
    .withMessage('Carryover amount is required')
    .bail()
    .notEmpty()
    .withMessage('Carryover amount cannot be empty')
    .bail()
    .not()
    .isString()
    .withMessage('Carryover amount must not be a string')
    .bail()
    .isNumeric()
    .withMessage('Carryover amount must be numeric')
    .bail()
    .isFloat()
    .withMessage('Carryover amount must be a float'),
];

const validateDonationCategoryId = (): ValidationChain[] => [
  param('id')
    // .not()
    // .isString()
    // .withMessage('id must not be a string')
    // .bail()
    .isNumeric()
    .withMessage('Donation Category ID must be a numeric value'),
];

donationCategoryRouter.use(isAuthenticated);

donationCategoryRouter
  .get('/:id', validateDonationCategoryId(), getDonationCategory)
  .get('/', getDonationCategories)
  .post('/', validateDonationCategory(), postDonationCategory)
  .put('/', validateDonationCategory(), editDonationCategory)
  .delete('/:id', validateDonationCategoryId(), deleteDonationCategory);
donationCategoryRouter.use(donationCategoryMapperMiddleware);

export default donationCategoryRouter;
