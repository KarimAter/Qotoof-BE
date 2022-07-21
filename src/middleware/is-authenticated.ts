/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';

const isAuthenticated = (req: Request, res: Response, next: NextFunction) => {
  const token = req.get('Authorization')?.split(' ')[1];
  // console.log(token);
  let decodedToken: any;
  try {
    if (token) {
      decodedToken = verify(token, 'secret');
      req.body.userId = decodedToken.userId;
      req.body.userRole = decodedToken.role;
      next();
    } else {
     const error = new Error('Not authenticated');
     throw error;
    }
  } catch (error) {
    next(error);
  }
};

export default isAuthenticated;
