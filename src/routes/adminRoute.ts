import { Router } from 'express';
import benRouter from './beneficiaryRoute';
import userRoute from './userRoute';
import donorRouter from './donorRoute';

const router = Router();

router.use('/donor', donorRouter);
router.use('/user', userRoute);
router.use('/beneficiary', benRouter);

export default router;
