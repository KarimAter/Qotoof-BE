import { Router } from 'express';
import postExpense from '../controllers/expenseController';

const expenseRouter = Router();

expenseRouter.post('/', postExpense);

export default expenseRouter;
