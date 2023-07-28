import { Router } from 'express';
import { ValidationChain, body, param } from 'express-validator';
import isAuthenticated from '../middleware/is-authenticated';
import {
  editExpenseCategory,
  getExpenseCategories,
  getExpenseCategory,
  postExpenseCategory,
  deleteExpenseCategory,
} from '../controllers/expenseCategoryController';
import expenseCategoryMapperMiddleware from '../middleware/expenseCategoryMapper';

const expenseCategoryRouter = Router();
const validateExpenseCategory = (): ValidationChain[] => [
  body('name')
    .exists()
    .withMessage('Expense Category is required')
    .bail()
    .notEmpty()
    .withMessage('Expense Category cannot be empty')
    .bail()
    .isAlpha()
    .withMessage('Expense Category must be alphabetic')
    .bail()
    .isLength({ min: 3 })
    .withMessage('Expense Category must be at least 3 characters long'),
  body('carryover')
    .exists()
    .withMessage('Carryover amount is required')
    .bail()
    .notEmpty()
    .withMessage('Carryover amount cannot be empty')
    .bail()
    .not()
    .isString()
    .withMessage('Carryover amount must not be a string')
    .bail()
    .isNumeric()
    .withMessage('Carryover amount must be numeric')
    .bail()
    .isFloat()
    .withMessage('Carryover amount must be a float'),
];

const validateExpenseCategoryId = (): ValidationChain[] => [
  param('id')
    // .not()
    // .isString()
    // .withMessage('id must not be a string')
    // .bail()
    .isNumeric()
    .withMessage('Expense Category ID must be a numeric value'),
];

expenseCategoryRouter.use(isAuthenticated);

expenseCategoryRouter
  .get('/:id', validateExpenseCategoryId(), getExpenseCategory)
  .get('/', getExpenseCategories)
  .post('/', validateExpenseCategory(), postExpenseCategory)
  .put('/', validateExpenseCategory(), editExpenseCategory)
  .delete('/:id', validateExpenseCategoryId(), deleteExpenseCategory);

expenseCategoryRouter.use(expenseCategoryMapperMiddleware);

export default expenseCategoryRouter;
