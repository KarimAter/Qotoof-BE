import { Router } from 'express';
import { ValidationChain, body } from 'express-validator';
import {
  postDonation,
  getDonations,
  getDonation,
  editDonation,
  deleteDonation,
} from '../controllers/donationController';

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
  .post('/', donationValidation(), postDonation)
  .get('/', getDonations)
  .put('/', editDonation)
  .delete('/', deleteDonation)
  .get('/:id', getDonation);

export default donationRouter;
