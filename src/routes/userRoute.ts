import { Router } from 'express';
import { body, ValidationChain } from 'express-validator';
import { postUser, getUsers, getUser } from '../controllers/userController';
import UserRole from '../utils/Constants';
import isAuthenticated from '../middleware/is-authenticated';
import userMapperMiddleware from '../middleware/userMapper';
import {
  validateRequiredName,
  validateOptionalName,
  validateEmail,
  validatePassword,
  validateRole,
} from '../validation/customValidators';

const userRouter = Router();

function signUpValidation(): ValidationChain[] {
  return [
    validateRequiredName('shortName', 'User name'),
    validateOptionalName('firstName', 'User first name'),
    validateOptionalName('lastName', 'User last name'),
    validateOptionalName('fullName', 'User full name'),
    validateEmail(),
    validatePassword(),
    validateRole(),
  ];
}
// TODO: edit and delete user
userRouter
  .post('/login', getUser)
  .post('/', signUpValidation(), postUser, userMapperMiddleware)
  .get('/', isAuthenticated, getUsers, userMapperMiddleware);

export default userRouter;
