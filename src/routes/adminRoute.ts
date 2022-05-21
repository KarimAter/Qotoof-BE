import { Router } from 'express';
import benRouter from './beneficiaryRoute';
import userRoute from './userRoute';
import donorRouter from './donorRoute';
import donationRouter from './donationRoute';

const router = Router();

router.use('/donor', donorRouter);
router.use('/user', userRoute);
router.use('/beneficiary', benRouter);
router.use('/donation', donationRouter);

export default router;
