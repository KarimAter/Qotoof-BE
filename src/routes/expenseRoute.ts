import { Router } from 'express';
import { ValidationChain, body, param } from 'express-validator';
import {
  postExpense,
  getExpenses,
  editExpense,
  deleteExpense,
  getExpense,
} from '../controllers/expenseController';
import isAuthenticated from '../middleware/is-authenticated';
import { isAuthorizedMethod } from '../middleware/is-authorized';
import expenseMapperMiddleware from '../middleware/expenseMapper';
import {
  validateDate,
  validateDecimalRange,
  validateFieldExistince,
  validateOneOf,
  validateRelationalId,
} from '../validation/customValidators';

const expenseRouter = Router();

const validateExpense = (): ValidationChain[] => [
  validateDate('Expense'),
  validateDecimalRange('amount', 'Expense amount', {
    minimum: 0,
    maximum: Infinity,
  }),
  // validateRelationalId('donationCategory'),
  // validateRelationalId('expenseCategory'),

  //  TODO: Refactor validation for these fields
  validateFieldExistince('status'),
  // validateRelationalId('paymentContainer'),

  validateFieldExistince('comment'),
  validateFieldExistince('project'),
];

const validateExpenseId = (): ValidationChain[] => [
  param('id').isNumeric().withMessage('Expense ID must be a numeric value'),
];
expenseRouter.use(isAuthenticated);
expenseRouter
  .post('/', validateExpense(), postExpense)
  .get(
    '/',
    (req, res, next) => isAuthorizedMethod(req, res, next, 3),
    getExpenses,
  )
  .get('/:id', getExpense)
  .put('/:id', validateExpense(), editExpense)
  .delete('/:id', deleteExpense);

expenseRouter.use(expenseMapperMiddleware);

export default expenseRouter;
