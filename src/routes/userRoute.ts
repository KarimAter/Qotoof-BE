import { Router } from 'express';
import { body } from 'express-validator';
import postUser from '../controllers/userController';

const userRouter = Router();

userRouter.post(
  '/',
  [
    body('name')
      .notEmpty()
      .withMessage('Please enter a user name')
      .isLength({ min: 3 })
      .withMessage('short name'),
  ],
  postUser,
);

export default userRouter;
