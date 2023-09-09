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
  validateOneOf,
  validateRelationalId,
} from '../validation/customValidators';

const donationRouter = Router();
const validateDonation = (): ValidationChain[] => [
  validateDate('Donation'),
  validateDecimalRange('amount', 'Donation amount', {
    minimum: 0,
    maximum: Infinity,
  }),
  // TODO: library to validate CUID
  // validateRelationalId('donationCategory'),
  // validateRelationalId('donor'),
  // validateRelationalId('paymentContainer'),
  // validateOneOf(
  //   'paymentType',
  //   'Payment Type',
  //   ['CASH', 'BANK_TRANSFER', 'CHEQUE', 'OTHER'],
  //   true,
  // ),
];

const validateDonationId = (): ValidationChain[] => [
  param('id').isNumeric().withMessage('Donation ID must be a numeric value'),
];
donationRouter.use(isAuthenticated);
donationRouter
  .post('/', postDonation)
  .get(
    '/',
    (req, res, next) => isAuthorizedMethod(req, res, next, 3),
    getDonations,
  )
  .get('/:id', getDonation)
  .put('/:id', editDonation)
  .delete('/:id', deleteDonation);

donationRouter.use(donationMapperMiddleware);

export default donationRouter;
