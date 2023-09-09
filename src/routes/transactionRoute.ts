import { Router } from 'express';
import { ValidationChain } from 'express-validator';
import isAuthenticated from '../middleware/is-authenticated';
import {
  editTransaction,
  getTransactions,
  getTransaction,
  postTransaction,
  deleteTransaction,
} from '../controllers/transactionController';
import {
  validateRequiredName,
  validateDecimalRange,
  validateId,
} from '../validation/customValidators';
import transactionMapperMiddleware from '../middleware/transactionMapper';

const transactionRouter = Router();

// TODO: Resume validation
const validateTransaction = (): ValidationChain[] => [
  validateRequiredName('name', ' Transaction'),
  validateDecimalRange('carryover', 'Carryover', {
    minimum: -100000,
    maximum: 100000,
  }),
];

transactionRouter.use(isAuthenticated);

transactionRouter
  .post('/', postTransaction)
  .get('/', getTransactions)
  .get('/:id', getTransaction)
  .put('/:id', editTransaction)
  // .get('/:id', validateId('transaction'), getTransaction)
  .delete('/:id', deleteTransaction);
transactionRouter.use(transactionMapperMiddleware);

export default transactionRouter;
