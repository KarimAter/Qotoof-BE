import { Router } from 'express';
import isAuthenticated from '../middleware/is-authenticated';
import getDetailedBalance from '../controllers/dashboardController';
import dashboardMapperMiddleware from '../middleware/dashboardMapper';

const dashboardRouter = Router();
dashboardRouter.use(isAuthenticated);

dashboardRouter
  //   .getSimple('/', isAuthenticated, postExpense)
  .get('/', getDetailedBalance);

dashboardRouter.use(dashboardMapperMiddleware);

export default dashboardRouter;
