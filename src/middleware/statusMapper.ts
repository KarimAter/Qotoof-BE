import { NextFunction, Request, Response } from 'express';
import { IStatus } from '../models/interfaces';
import { arrayMapper } from '../utils/helperFunctions';

const statusMapperMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const statusEntity: IStatus[] | IStatus = req.body;

  return res.json(arrayMapper(statusEntity));
};

export default statusMapperMiddleware;
