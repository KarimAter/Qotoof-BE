import { Router } from 'express';
import benRouter from './beneficiaryRoute';
import userRoute from './userRoute';
import donorRouter from './donorRoute';
import donationRouter from './donationRoute';
import expenseRouter from './expenseRoute';
import dashboardRouter from './dashboarRoute';

const router = Router();

router.use('/donor', donorRouter);
router.use('/user', userRoute);
router.use('/beneficiary', benRouter);
router.use('/donation', donationRouter);
router.use('/expense', expenseRouter);
router.use('/dashboard', dashboardRouter);

export default router;
