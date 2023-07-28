import { Router } from 'express';
import { ValidationChain, body, param } from 'express-validator';
import {
  postDonation,
  getDonations,
  getDonation,
  editDonation,
  deleteDonation,
} from '../controllers/donationController';
import isAuthenticated from '../middleware/is-authenticated';
import { isAuthorizedMethod } from '../middleware/is-authorized';
import donationMapperMiddleware from '../middleware/donationMapper';

const donationRouter = Router();
const validateDonation = (): ValidationChain[] => [
  body('date')
    .if(body('date').exists().withMessage('Donation date is required'))
    .notEmpty()
    .withMessage('Donation date cannot be empty')
    .bail(),
  // .isDate()
  // .withMessage('donation date is invalid'),
  body('amount')
    .exists()
    .withMessage('Donation amount is required')
    .bail()
    .notEmpty()
    .withMessage('Donation amount cannot be empty')
    .bail()
    .not()
    .isString()
    .withMessage('Donation amount must not be a string')
    .bail()
    .isNumeric()
    .withMessage('Donation amount must be numeric')
    .bail()
    .isInt({ min: 0 })
    .withMessage('Donation amount must be positive'),
  body('donationCategory.id')
    .exists()
    .withMessage('Donation category is required')
    .bail()
    .notEmpty()
    .withMessage('Donation category cannot be empty')
    .bail()
    .isNumeric()
    .withMessage('Donation category ID must be numeric'),
  body('donor.id')
    .exists()
    .withMessage('Donor is required')
    .bail()
    .notEmpty()
    .withMessage('Donor cannot be empty')
    .bail()
    .isNumeric()
    .withMessage('Donor ID must be numeric'),
];

const validateDonationId = (): ValidationChain[] => [
  param('id').isNumeric().withMessage('Donation ID must be a numeric value'),
];
donationRouter.options('/', (req, res) => {
  // Set the necessary CORS headers for the OPTIONS request
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Methods',
    'OPTIONS, GET, POST, PUT, DELETE',
  );
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.sendStatus(200);
});
donationRouter.use(isAuthenticated);
donationRouter
  .post('/', validateDonation(), postDonation)
  .put('/', validateDonation(), editDonation)
  .get(
    '/',
    (req, res, next) => isAuthorizedMethod(req, res, next, 3),
    getDonations,
  )
  .delete('/', validateDonationId(), deleteDonation)
  .get('/:id', validateDonationId(), getDonation);

donationRouter.use(donationMapperMiddleware);

export default donationRouter;
