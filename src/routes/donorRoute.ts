import { Router } from 'express';
import { postDonor, getDonors } from '../controllers/donorController';

const donorRouter = Router();

donorRouter.post('/', postDonor).get('/', getDonors);

export default donorRouter;
