import { Router } from 'express';
import { body, ValidationChain } from 'express-validator';
import { postUser, getUsers, getUser } from '../controllers/userController';
import UserRole from '../utils/Constants';
import isAuthenticated from '../middleware/is-authenticated';

const userRouter = Router();

function signUpValidation(): ValidationChain[] {
  return [
    body('name')
      .notEmpty()
      .withMessage('Please enter a user name')
      .isLength({ min: 3 })
      .withMessage('short name'),
    body('email').notEmpty().isEmail(),
    body('password').notEmpty(),
    body('role')
      .notEmpty()
      .custom((role) => {
        console.log(role);
        console.log(Object.keys(UserRole));
        return Object.keys(UserRole).indexOf(role) !== -1;
      })
      .withMessage('Invalid Role'),
  ];
}
userRouter
  .post('/login', getUser)
  .post('/', signUpValidation(), postUser)
  .get('/', isAuthenticated, getUsers);

export default userRouter;
