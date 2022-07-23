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
import { isAuthorizedMethod } from '../middleware/is-authorized';

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
  .get(
    '/',
    isAuthenticated,
    (req, res, next) => isAuthorizedMethod(req, res, next, 3),
    getDonations,
  )
  .put('/', isAuthenticated, editDonation)
  .delete('/', isAuthenticated, deleteDonation)
  .get('/:id', isAuthenticated, getDonation);

export default donationRouter;
