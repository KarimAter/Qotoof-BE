import { Router } from 'express';
import { ValidationChain, body, param } from 'express-validator';
import {
  postReferral,
  getReferrals,
  getReferral,
  deleteReferral,
  editReferral,
} from '../controllers/referralController';
import isAuthenticated from '../middleware/is-authenticated';
import { isAuthorized } from '../middleware/is-authorized';
import referralMapperMiddleware from '../middleware/referralMapper';

const referralRouter = Router();

const validateReferral = (): ValidationChain[] => [
  body('shortName')
    .exists()
    .withMessage('Referral name is required')
    .bail()
    .notEmpty()
    .withMessage('Referral name cannot be empty')
    .bail()
    .isAlpha()
    .withMessage('Referral name must be alphabetic')
    .bail()
    .isLength({ min: 3 })
    .withMessage('Referral name must be at least 3 characters long'),
  body('firstName')
    .if(body('firstName').exists().withMessage('First name is required'))
    .notEmpty()
    .withMessage('First name cannot be empty')
    .bail()
    .isAlpha()
    .withMessage('First name must be alphabetic')
    .bail()
    .isLength({ min: 3 })
    .withMessage('First name must be at least 3 characters long'),
  body('lastName')
    .if(body('lastName').exists().withMessage('Last name is required'))
    .notEmpty()
    .withMessage('Last name cannot be empty')
    .bail()
    .isAlpha()
    .withMessage('Last name must be alphabetic')
    .bail()
    .isLength({ min: 3 })
    .withMessage('Last name must be at least 3 characters long'),
];

const validateReferralId = (): ValidationChain[] => [
  param('id')
    // .not()
    // .isString()
    // .withMessage('id must not be a string')
    // .bail()
    .isNumeric()
    .withMessage('Referral ID must be a numeric value'),
];
referralRouter.use(isAuthenticated);
referralRouter
  .post('/', validateReferral(), postReferral)
  .get('/:id', isAuthorized, validateReferralId(), getReferral)
  .get('/', isAuthorized, getReferrals)
  .put('/', validateReferral(), editReferral)
  .delete('/:id', validateReferralId(), deleteReferral);
referralRouter.use(referralMapperMiddleware);

export default referralRouter;
