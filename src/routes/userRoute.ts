import { Router } from 'express';
import { body, ValidationChain } from 'express-validator';
import postUser from '../controllers/userController';

const userRouter = Router();

function userValidation(): ValidationChain[] {
  return [
    body('name')
      .notEmpty()
      .withMessage('Please enter a user name')
      .isLength({ min: 3 })
      .withMessage('short name'),
    body('password').notEmpty(),
  ];
}
userRouter.post('/', userValidation(), postUser);

export default userRouter;
