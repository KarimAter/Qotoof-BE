import { Router } from 'express';
import benRouter from './beneficiaryRoute';
import userRouter from './userRoute';
import referralRouter from './referralRoute';
import donorRouter from './donorRoute';
import donationRouter from './donationRoute';
import expenseRouter from './expenseRoute';
import dashboardRouter from './dashboarRoute';
import donationCategoryRouter from './donationCategoryRoute';
import expenseCategoryRouter from './expenseCategoryRoute';

const router = Router();

router.use('/donor', donorRouter);
router.use('/user', userRouter);
router.use('/referral', referralRouter);
router.use('/beneficiary', benRouter);
router.use('/donation', donationRouter);
router.use('/expense', expenseRouter);
router.use('/dashboard', dashboardRouter);
router.use('/donationCategory', donationCategoryRouter);
router.use('/expenseCategory', expenseCategoryRouter);

export default router;
