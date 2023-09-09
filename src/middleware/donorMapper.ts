import { NextFunction, Request, Response } from 'express';
import { IDonor } from '../models/interfaces';
import { arrayMapper } from '../utils/helperFunctions';

const donorMapperMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const donorEntity: IDonor[] | IDonor = req.body;
  return res.json(
    arrayMapper(donorEntity),
  );
};

export default donorMapperMiddleware;
