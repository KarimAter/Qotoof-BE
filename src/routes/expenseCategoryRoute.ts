import { Router } from 'express';
import { ValidationChain } from 'express-validator';
import isAuthenticated from '../middleware/is-authenticated';
import {
  editExpenseCategory,
  getExpenseCategories,
  getExpenseCategory,
  postExpenseCategory,
  deleteExpenseCategory,
} from '../controllers/expenseCategoryController';
import expenseCategoryMapperMiddleware from '../middleware/expenseCategoryMapper';
import {
  validateRequiredName,
  validateDecimalRange,
  validateId,
} from '../validation/customValidators';

const expenseCategoryRouter = Router();
const validateExpenseCategory = (): ValidationChain[] => [
  validateRequiredName('name', 'Expense Category'),
  validateDecimalRange('carryover', 'Carryover', {
    minimum: -100000,
    maximum: 100000,
  }),
];

expenseCategoryRouter.use(isAuthenticated);

expenseCategoryRouter
  .get('/', getExpenseCategories)
  .post('/', validateExpenseCategory(), postExpenseCategory)
  .put('/', validateExpenseCategory(), editExpenseCategory)
  .get('/:id', validateId('Expense category'), getExpenseCategory)
  .delete('/:id', validateId('Expense category'), deleteExpenseCategory);

expenseCategoryRouter.use(expenseCategoryMapperMiddleware);

export default expenseCategoryRouter;
