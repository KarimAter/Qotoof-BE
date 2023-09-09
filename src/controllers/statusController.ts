import { validationResult } from 'express-validator';
import { NextFunction, Request, Response } from 'express';
import prismaClient from '../utils/databaseConnector';
import prismaOperation from '../utils/helperFunctions';
import ValidationError from '../middleware/Errors/InvalidRequestError';
import { IStatus } from '../models/interfaces';

const getStatuses = async (req: Request, res: Response, next: NextFunction) => {
  const result = await prismaOperation(
    () =>
      prismaClient.status.findMany({
        select: {
          id: true,
          name: true,
        },
      }),
    res,
    next,
  );

  req.body = result;
  next();
};

const getStatus = async (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  const { id } = req.params;
  try {
    if (!errors.isEmpty()) {
      throw new ValidationError('Invalid input', errors);
    }

    const result = await prismaOperation(
      () =>
        prismaClient.status.findUnique({
          where: { id },
          select: {
            id: true,
            name: true,
          },
        }),
      res,
      next,
    );
    req.body = result === null ? [] : result;
    next();
  } catch (error) {
    next(error);
  }
};

const postStatus = async (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  const { name } = req.body as IStatus;
  try {
    if (!errors.isEmpty()) {
      throw new ValidationError('Invalid input', errors);
    }
    const result = await prismaOperation(
      () =>
        prismaClient.status.create({
          data: { name },
        }),
      res,
      next,
    );
    req.body = result;
    next();
  } catch (error) {
    next(error);
  }
};

const editStatus = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;
  const { name } = req.body as IStatus;
  const errors = validationResult(req);
  try {
    if (!errors.isEmpty()) {
      throw new ValidationError('Invalid input', errors);
    }

    const result = await prismaOperation(
      () =>
        prismaClient.status.update({
          where: { id },
          data: { name },
        }),
      res,
      next,
    );
    req.body = result;
    next();
  } catch (error) {
    next(error);
  }
};

const deleteStatus = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const errors = validationResult(req);
  const { id } = req.params;
  try {
    if (!errors.isEmpty()) {
      throw new ValidationError('Invalid input', errors);
    }

    const result = await prismaOperation(
      () =>
        prismaClient.status.delete({
          where: { id },
        }),
      res,
      next,
    );
    req.body = result;
    next();
  } catch (error) {
    next(error);
  }
};

export { getStatuses, getStatus, postStatus, editStatus, deleteStatus };
