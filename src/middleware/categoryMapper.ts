import { NextFunction, Request, Response } from 'express';
import { ICategory } from '../models/interfaces';
import { arrayMapper } from '../utils/helperFunctions';
// import { categoryMapper } from '../models/category';

const categoryMapperMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const categoryEntity: ICategory[] | ICategory = req.body;
  return res.json(arrayMapper(categoryEntity));
};

export default categoryMapperMiddleware;
