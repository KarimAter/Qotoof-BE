import { Router } from 'express';
import benRouter from './beneficiaryRoute';
import userRouter from './userRoute';
import referralRouter from './referralRoute';
import donorRouter from './donorRoute';
import donationRouter from './donationRoute';
import expenseRouter from './expenseRoute';
import dashboardRouter from './dashboardRoute';
import paymentContainerRouter from './paymentContainerRoute';
import categoryRouter from './categoryRoute';
import transactionTypeRouter from './transactionTypeRoute';
import transactionRouter from './transactionRoute';
import statusRouter from './statusRoute';

const router = Router();
router.options('*', (req, res, next) => {
  res.sendStatus(200);
});
router.use('/donor', donorRouter);
router.use('/user', userRouter);
router.use('/referral', referralRouter);
router.use('/beneficiary', benRouter);
router.use('/donation', donationRouter);
router.use('/expense', expenseRouter);
router.use('/dashboard', dashboardRouter);
router.use('/category', categoryRouter);
router.use('/paymentContainer', paymentContainerRouter);
router.use('/transaction', transactionRouter);
router.use('/transactionType', transactionTypeRouter);
router.use('/status', statusRouter);
router.use('/dashboard', dashboardRouter);

export default router;
