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
import {
  validateDate,
  validateDecimalRange,
  validateRelationalId,
} from '../validation/customValidators';

const donationRouter = Router();
const validateDonation = (): ValidationChain[] => [
  validateDate('Donation'),
  validateDecimalRange('amount', 'Donation amount', {
    minimum: 0,
    maximum: Infinity,
  }),
  validateRelationalId('donationCategory'),
  validateRelationalId('donor'),
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
