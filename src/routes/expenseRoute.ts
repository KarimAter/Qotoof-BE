import { Router } from 'express';
import { ValidationChain, body, param } from 'express-validator';
import {
  postExpense,
  getExpenses,
  editExpense,
  deleteExpense,
} from '../controllers/expenseController';
import isAuthenticated from '../middleware/is-authenticated';
import { isAuthorizedMethod } from '../middleware/is-authorized';
import expenseMapperMiddleware from '../middleware/expenseMapper';
import {
  validateDate,
  validateDecimalRange,
  validateFieldExistince,
  validateRelationalId,
} from '../validation/customValidators';

const expenseRouter = Router();

const validateExpense = (): ValidationChain[] => [
  validateDate('Expense'),
  validateDecimalRange('amount', 'Expense amount', {
    minimum: 0,
    maximum: Infinity,
  }),
  validateRelationalId('donationCategory'),
  validateRelationalId('expenseCategory'),

  //  TODO: Refactor validation for these fields
  validateFieldExistince('status'),
  validateFieldExistince('paymentType'),
  validateFieldExistince('comment'),
  validateFieldExistince('project'),

];

const validateExpenseId = (): ValidationChain[] => [
  param('id').isNumeric().withMessage('Expense ID must be a numeric value'),
];
expenseRouter.options('/', (req, res) => {
  // Set the necessary CORS headers for the OPTIONS request
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Methods',
    'OPTIONS, GET, POST, PUT, DELETE',
  );
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.sendStatus(200);
});
expenseRouter.use(isAuthenticated);
expenseRouter
  .post('/', validateExpense(), postExpense)
  .put('/', validateExpense(), editExpense)
  .get(
    '/',
    (req, res, next) => isAuthorizedMethod(req, res, next, 3),
    getExpenses,
  )
  .delete('/', validateExpenseId(), deleteExpense)
  .get('/:id', validateExpenseId(), getExpenses);

expenseRouter.use(expenseMapperMiddleware);

export default expenseRouter;
