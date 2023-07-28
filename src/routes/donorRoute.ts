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

const donorRouter = Router();
const validateDonor = (): ValidationChain[] => [
  body('name')
    .exists()
    .withMessage('Donor name is required')
    .bail()
    .notEmpty()
    .withMessage('Donor name cannot be empty')
    .bail()
    .isAlpha()
    .withMessage('Donor name must be alphabetic')
    .bail()
    .isLength({ min: 3 })
    .withMessage('Donor name must be at least 3 characters long'),
  body('referral.id')
    .exists()
    .withMessage('Referral is required')
    .bail()
    .notEmpty()
    .withMessage('Referral cannot be empty')
    .bail()
    .isNumeric()
    .withMessage('Referral ID must be numeric'),
];

const validateDonorId = (): ValidationChain[] => [
  param('id')
    // .not()
    // .isString()
    // .withMessage('id must not be a string')
    // .bail()
    .isNumeric()
    .withMessage('Referral ID must be a numeric value'),
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
  .get('/:id', isAuthorized, validateDonorId(), getDonor)
  .delete('/:id', validateDonorId(), deleteDonor);
donorRouter.use(donorMapperMiddleware);

export default donorRouter;
