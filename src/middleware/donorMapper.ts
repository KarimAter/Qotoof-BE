import { NextFunction, Request, Response } from 'express';
import { IDonor } from '../models/interfaces';
import { donorMapper } from '../models/donor';

const donorMapperMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const donorEntity: IDonor[] | IDonor = req.body;
  return res.json(
    donorMapper(Array.isArray(donorEntity) ? donorEntity : [donorEntity]),
  );
};

export default donorMapperMiddleware;
