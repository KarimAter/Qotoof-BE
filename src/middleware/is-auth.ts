/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';

const isAuth = (req: Request, res: Response, next: NextFunction) => {
  const token = req.get('Authorization')?.split(' ')[1];
  let decodedToken: any;
  try {
    if (token) {
      decodedToken = verify(token, 'secret');
      req.body.userId = decodedToken.userId;
      next();
    }
  } catch (error) {
    next(new Error('Not authenticated'));
  }
};

export default isAuth;
