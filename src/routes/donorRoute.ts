import { Router } from 'express';
import {
  postDonor,
  getDonors,
  deleteDonor,
  editDonor,
} from '../controllers/donorController';

const donorRouter = Router();

donorRouter
  .post('/', postDonor)
  .get('/', getDonors)
  .delete('/', deleteDonor)
  .put('/', editDonor);

export default donorRouter;
