import { Router } from 'express';
import {
  postDonor,
  getDonors,
  deleteDonor,
  editDonor,
} from '../controllers/donorController';
import isAuthenticated from '../middleware/is-authenticated';
import { isAuthorized } from '../middleware/is-authorized';

const donorRouter = Router();

donorRouter
  .post('/', isAuthenticated, postDonor)
  .get('/', isAuthenticated, isAuthorized, getDonors)
  .delete('/', isAuthenticated, deleteDonor)
  .put('/', isAuthenticated, editDonor);

export default donorRouter;
