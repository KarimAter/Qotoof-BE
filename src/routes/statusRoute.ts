import { Router } from 'express';
import { ValidationChain } from 'express-validator';
import isAuthenticated from '../middleware/is-authenticated';
import {
  editStatus,
  getStatuses,
  getStatus,
  postStatus,
  deleteStatus,
} from '../controllers/statusController';
import {
  validateRequiredName,
  validateDecimalRange,
  validateId,
} from '../validation/customValidators';
import statusMapperMiddleware from '../middleware/statusMapper';

const statusRouter = Router();

// // TODO: Resume validation
// const validateStatus = (): ValidationChain[] => [
//   validateRequiredName('name', ' Status'),
//   validateDecimalRange('carryover', 'Carryover', {
//     minimum: -100000,
//     maximum: 100000,
//   }),
// ];

statusRouter.use(isAuthenticated);

statusRouter
  .post('/', postStatus)
  .get('/', getStatuses)
  .get('/:id', getStatus)
  .put('/:id', editStatus)
  // .get('/:id', validateId('transactionType'), getStatus)
  .delete('/:id', deleteStatus);

statusRouter.use(statusMapperMiddleware);

export default statusRouter;
