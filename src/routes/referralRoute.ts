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
import { validateId } from '../validation/customValidators';

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
referralRouter.use(isAuthenticated);
referralRouter
  .post('/', validateReferral(), postReferral)
  .get('/', isAuthorized, getReferrals)
  .put('/', validateReferral(), editReferral)
  .get('/:id', isAuthorized, validateId('Referral'), getReferral)
  .delete('/:id', validateId('Referral'), deleteReferral);
referralRouter.use(referralMapperMiddleware);

export default referralRouter;
