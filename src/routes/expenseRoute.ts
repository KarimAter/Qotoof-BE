import { Router } from 'express';
import { postExpense, getExpenses } from '../controllers/expenseController';

const expenseRouter = Router();

expenseRouter.post('/', postExpense).get('/', getExpenses);

export default expenseRouter;
