/* eslint-disable @typescript-eslint/no-throw-literal */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextFunction, Request, Response } from 'express';

export const isAuthorized = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const role = req.body.userRole;
  try {
    if (!role) {
      const err = new Error('bad request');
      throw err;
    }
    if (role !== 'SUPER') {
      const err = new Error('Not authorized');
      throw err;
    }
    next();
  } catch (error) {
    next(error);
  }
};

export default isAuthorized;
