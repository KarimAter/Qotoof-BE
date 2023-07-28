/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextFunction, Request, Response } from 'express';
import { verify, JsonWebTokenError } from 'jsonwebtoken';
import JwtError from './Errors/JwtError';

const isAuthenticated = (req: Request, res: Response, next: NextFunction) => {
  const token = req.get('Authorization')?.split(' ')[1];
  let decodedToken: any;
  // TODO: Check to handle expired token
  try {
    if (!token) throw new JwtError('You are not authenticated');
    try {
      decodedToken = verify(token, 'secret');
    } catch (error: JsonWebTokenError | unknown) {
      throw new JwtError('This is invalid JWT token');
    }
    req.body.userId = decodedToken.userId;
    req.body.userRole = decodedToken.role;
    next();
  } catch (error) {
    next(error);
  }
};

export default isAuthenticated;
