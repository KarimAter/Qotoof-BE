import { Router } from 'express';
import {
  postExpense,
  getExpenses,
  editExpense,
  deleteExpense,
} from '../controllers/expenseController';
import isAuthenticated from '../middleware/is-authenticated';
import { isAuthorized, isAuthorizedMethod } from '../middleware/is-authorized';

const expenseRouter = Router();

expenseRouter
  .post('/', isAuthenticated, postExpense)
  .get('/', isAuthenticated)
  .put('/', isAuthenticated, editExpense)
  .delete('/', isAuthenticated, deleteExpense);

export default expenseRouter;
