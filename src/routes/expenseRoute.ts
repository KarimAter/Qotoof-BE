import { Router } from 'express';
import {
  postExpense,
  getExpenses,
  editExpense,
  deleteExpense,
} from '../controllers/expenseController';
import isAuth from '../middleware/is-auth';

const expenseRouter = Router();

expenseRouter
  .post('/', isAuth, postExpense)
  .get('/', isAuth, getExpenses)
  .put('/', isAuth, editExpense)
  .delete('/', isAuth, deleteExpense);

export default expenseRouter;
