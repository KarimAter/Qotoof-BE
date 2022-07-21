import { Router } from 'express';
import { ValidationChain, body } from 'express-validator';
import {
  postDonation,
  getDonations,
  getDonation,
  editDonation,
  deleteDonation,
} from '../controllers/donationController';
import isAuthenticated from '../middleware/is-authenticated';

const donationRouter = Router();
function donationValidation(): ValidationChain[] {
  return [
    body('donor.id')
      .exists()
      .notEmpty()
      .withMessage('Please enter a donor')
      .isNumeric()
      .withMessage('wrong donor'),
    body('amount')
      .exists()
      .notEmpty()
      .withMessage('Please enter amount')
      .isFloat()
      .withMessage('wrong amount'),
    body('category')
      .exists()
      .notEmpty()
      .withMessage('Please enter a category')
      .isString()
      .withMessage('amount sent as string'),
  ];
}

donationRouter
  .post('/', isAuthenticated, donationValidation(), postDonation)
  .get('/', isAuthenticated, getDonations)
  .put('/', isAuthenticated, editDonation)
  .delete('/', isAuthenticated, deleteDonation)
  .get('/:id', isAuthenticated, getDonation);

export default donationRouter;
