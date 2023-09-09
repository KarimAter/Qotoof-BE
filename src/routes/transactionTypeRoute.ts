import { Router } from 'express';
import { ValidationChain } from 'express-validator';
import isAuthenticated from '../middleware/is-authenticated';
import {
  editTransactionType,
  getTransactionTypes,
  getTransactionType,
  postTransactionType,
  deleteTransactionType,
} from '../controllers/transactionTypeController';
import {
  validateRequiredName,
  validateDecimalRange,
  validateId,
} from '../validation/customValidators';
import transactionTypeMapperMapperMiddleware from '../middleware/TransactionTypeMapper';

const transactionTypeRouter = Router();

// TODO: Resume validation
const validateTransactionType = (): ValidationChain[] => [
  validateRequiredName('name', ' TransactionType'),
  validateDecimalRange('carryover', 'Carryover', {
    minimum: -100000,
    maximum: 100000,
  }),
];

transactionTypeRouter.use(isAuthenticated);

transactionTypeRouter
  .post('/', postTransactionType)
  .get('/', getTransactionTypes)
  .get('/:id', getTransactionType)
  .put('/:id', editTransactionType)
  .delete('/:id', deleteTransactionType);
// .get('/:id', validateId('transactionType'), getTransactionType)
transactionTypeRouter.use(transactionTypeMapperMapperMiddleware);

export default transactionTypeRouter;
