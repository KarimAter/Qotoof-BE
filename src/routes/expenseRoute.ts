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

const expenseRouter = Router();

const validateExpense = (): ValidationChain[] => [
  body('date')
    .if(body('date').exists().withMessage('Expense date is required'))
    .notEmpty()
    .withMessage('Expense date cannot be empty')
    .bail(),
  // .isDate()
  // .withMessage('expense date is invalid'),
  body('amount')
    .exists()
    .withMessage('Expense amount is required')
    .bail()
    .notEmpty()
    .withMessage('Expense amount cannot be empty')
    .bail()
    .not()
    .isString()
    .withMessage('Expense amount must not be a string')
    .bail()
    .isNumeric()
    .withMessage('Expense amount must be numeric')
    .bail()
    .isInt({ min: 0 })
    .withMessage('Expense amount must be positive'),
  body('donationCategory.id')
    .exists()
    .withMessage('Donation category is required')
    .bail()
    .notEmpty()
    .withMessage('Donation category cannot be empty')
    .bail()
    .isNumeric()
    .withMessage('Donation category ID must be numeric'),
  body('expenseCategory.id')
    .exists()
    .withMessage('Expense category is required')
    .bail()
    .notEmpty()
    .withMessage('Expense category cannot be empty')
    .bail()
    .isNumeric()
    .withMessage('Expense category ID must be numeric'),
  body('status').if(body('status').exists().withMessage('Status is required')),
  body('paymentType').if(
    body('paymentType').exists().withMessage('Status is required'),
  ),
  body('comment').if(
    body('comment').exists().withMessage('Status is required'),
  ),
  body('project').if(
    body('project').exists().withMessage('Status is required'),
  ),
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
