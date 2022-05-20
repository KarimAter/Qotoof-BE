import { Router } from 'express';
import postUser from '../controllers/userControllers';

const userRouter = Router();

userRouter.post('/', postUser);

export default userRouter;
