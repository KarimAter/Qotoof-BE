import { Router } from 'express';
import postDonor from '../controllers/donorController';

const donorRouter = Router();

donorRouter.post('/', postDonor);

export default donorRouter;
