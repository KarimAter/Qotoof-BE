import { Router } from 'express';
import {
  postDonor,
  getDonors,
  deleteDonor,
  editDonor,
} from '../controllers/donorController';
import isAuth from '../middleware/is-auth';

const donorRouter = Router();

donorRouter
  .post('/', isAuth, postDonor)
  .get('/', isAuth, getDonors)
  .delete('/', isAuth, deleteDonor)
  .put('/', isAuth, editDonor);

export default donorRouter;
