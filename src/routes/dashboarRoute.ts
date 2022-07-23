import { Router } from 'express';
import getCashIn from '../controllers/dashboardController';

import isAuthenticated from '../middleware/is-authenticated';
import { isAuthorized, isAuthorizedMethod } from '../middleware/is-authorized';

const dashboardRouter = Router();

dashboardRouter
//   .post('/', isAuthenticated, postExpense)
  .get('/', isAuthenticated, getCashIn);
//   .put('/', isAuthenticated, editExpense)
//   .delete('/', isAuthenticated, deleteExpense);

export default dashboardRouter;
