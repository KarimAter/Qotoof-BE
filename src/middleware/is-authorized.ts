/* eslint-disable @typescript-eslint/no-throw-literal */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextFunction, Request, Response } from 'express';
import UserRole from '../utils/Constants';

export const isAuthorized = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const role: string = req.body.userRole;
  const authLevel = Object.values(UserRole).indexOf(role);
  try {
    if (!role) {
      const err = new Error('bad request');
      throw err;
    }
    if (authLevel < UserRole.ADMIN) {
      const err = new Error('Not authorized');
      throw err;
    }

    next();
  } catch (error) {
    next(error);
  }
};

export default isAuthorized;
