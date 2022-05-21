import { Router } from 'express';
import postDonation from '../controllers/donationController';

const donationRouter = Router();

donationRouter.post('/', postDonation);

export default donationRouter;
