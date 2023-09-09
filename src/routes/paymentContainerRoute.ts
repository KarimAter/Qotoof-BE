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
import {
  deletePaymentContainer,
  editPaymentContainer,
  getPaymentContainer,
  getPaymentContainers,
  postPaymentContainer,
} from '../controllers/paymentContainerController';
import paymentContainerMapperMiddleware from '../middleware/paymentContainerMapper';

const paymentContainerRouter = Router();

const validatePaymentContainer = (): ValidationChain[] => [
  body('name')
    .exists()
    .withMessage('Payment Container name is required')
    .bail()
    .notEmpty()
    .withMessage('Payment Container name cannot be empty')
    .bail()
    .isAlpha()
    .withMessage('Payment Container name must be alphabetic')
    .bail()
    .isLength({ min: 3 })
    .withMessage('Payment Container name must be at least 3 characters long'),
];
paymentContainerRouter.use(isAuthenticated);
paymentContainerRouter
  // .post('/', validatePaymentContainer(), postPaymentContainer)
  // .get('/', isAuthorized, getPaymentContainers)
  // .put('/', validatePaymentContainer(), editPaymentContainer)
  // .get('/:id', isAuthorized, validateId('Payment Container'), getPaymentContainer)
  // .delete('/:id', validateId('Payment Container'), deletePaymentContainer);
  .post('/', postPaymentContainer)
  .get('/', isAuthorized, getPaymentContainers)
  .get('/:id', isAuthorized, getPaymentContainer)
  .put('/:id', editPaymentContainer)
  .delete('/:id', deletePaymentContainer);
paymentContainerRouter.use(paymentContainerMapperMiddleware);

export default paymentContainerRouter;
