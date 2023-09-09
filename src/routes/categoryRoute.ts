import { Router } from 'express';
import { ValidationChain } from 'express-validator';
import isAuthenticated from '../middleware/is-authenticated';
import {
  editCategory,
  getCategories,
  getCategory,
  postCategory,
  deleteCategory,
  getSubCategories,
} from '../controllers/categoryController';
import CategoryMapperMiddleware from '../middleware/categoryMapper';
import {
  validateRequiredName,
  validateDecimalRange,
  validateId,
} from '../validation/customValidators';

const categoryRouter = Router();

// TODO: Resume validation
const validateCategory = (): ValidationChain[] => [
  validateRequiredName('name', ' Category'),
  validateDecimalRange('carryover', 'Carryover', {
    minimum: -100000,
    maximum: 100000,
  }),
];

categoryRouter.use(isAuthenticated);

categoryRouter
  .get('/', getCategories)
  .post('/', postCategory)
  .put('/:id', editCategory)
  .get('/:id', getCategory)
  // .get('/:id', validateId('category'), getCategory)
  .delete('/:id', deleteCategory);

categoryRouter.use(CategoryMapperMiddleware);

export default categoryRouter;
