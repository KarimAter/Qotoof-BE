import { Router } from 'express';
import postUser from '../controllers/userController';

const userRouter = Router();

userRouter.post('/', postUser);

export default userRouter;
