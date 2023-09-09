import { validationResult } from 'express-validator';
import { NextFunction, Request, Response } from 'express';
import prismaClient from '../utils/databaseConnector';
import prismaOperation from '../utils/helperFunctions';
import ValidationError from '../middleware/Errors/InvalidRequestError';
import { ITransaction } from '../models/interfaces';
// prismaClient.transaction.groupBy({
//   by: ['currentCategoryId'],
//   _sum: { amount: true },
//   // select: {
//   //   id: true,
//   //   date: true,
//   //   amount: true,
//   //   currentCategory: { select: { name: true } },
//   //   targetCategory: { select: { name: true } },
//   //   currentContainer: { select: { name: true } },
//   //   targetContainer: { select: { name: true } },
//   //   TransactionType: { select: { name: true } },
//   //   Status: { select: { name: true } },
//   //   documentId: true,
//   //   createdAt: true,
//   //   updatedAt: true,
//   // },
// }),

const getTransactions = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const result = await prismaOperation(
    () =>
      prismaClient.transaction.findMany({
        select: {
          id: true,
          date: true,
          amount: true,
          currentCategory: { select: { name: true } },
          targetCategory: { select: { name: true } },
          currentContainer: { select: { name: true } },
          targetContainer: { select: { name: true } },
          TransactionType: { select: { name: true } },
          Status: { select: { name: true } },
          documentId: true,
          createdAt: true,
          updatedAt: true,
        },
      }),
    res,
    next,
  );

  req.body = result;
  next();
};

const getTransaction = async (
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
        prismaClient.transaction.findUnique({
          where: { id },
          select: {
            id: true,
            date: true,
            amount: true,
            currentCategory: { select: { name: true } },
            targetCategory: { select: { name: true } },
            currentContainer: { select: { name: true } },
            targetContainer: { select: { name: true } },
            TransactionType: { select: { name: true } },
            Status: { select: { name: true } },
            documentId: true,
            createdAt: true,
            updatedAt: true,
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

const postTransaction = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const errors = validationResult(req);
  const {
    date,
    amount,
    currentCategoryId,
    targetCategoryId,
    currentContainerId,
    targetContainerId,
    transactionTypeId,
    statusId,
  } = req.body as ITransaction;
  try {
    if (!errors.isEmpty()) {
      throw new ValidationError('Invalid input', errors);
    }
    const result = await prismaOperation(
      () =>
        prismaClient.transaction.create({
          data: {
            date,
            amount,
            currentCategoryId,
            targetCategoryId,
            currentContainerId,
            targetContainerId,
            transactionTypeId,
            statusId,
          },
          select: {
            id: true,
            date: true,
            amount: true,
            currentCategory: { select: { name: true } },
            targetCategory: { select: { name: true } },
            currentContainer: { select: { name: true } },
            targetContainer: { select: { name: true } },
            TransactionType: { select: { name: true } },
            Status: { select: { name: true } },
            documentId: true,
            createdAt: true,
            updatedAt: true,
          },
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

const editTransaction = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const errors = validationResult(req);
  const { id } = req.params;

  const {
    date,
    amount,
    currentCategoryId,
    targetCategoryId,
    currentContainerId,
    targetContainerId,
    transactionTypeId,
    statusId,
  } = req.body as ITransaction;
  try {
    if (!errors.isEmpty()) {
      throw new ValidationError('Invalid input', errors);
    }

    const result = await prismaOperation(
      () =>
        prismaClient.transaction.update({
          where: { id },
          data: {
            date,
            amount,
            currentCategoryId,
            targetCategoryId,
            currentContainerId,
            targetContainerId,
            transactionTypeId,
            statusId,
          },
          select: {
            id: true,
            date: true,
            amount: true,
            currentCategory: { select: { name: true } },
            targetCategory: { select: { name: true } },
            currentContainer: { select: { name: true } },
            targetContainer: { select: { name: true } },
            TransactionType: { select: { name: true } },
            Status: { select: { name: true } },
            documentId: true,
            createdAt: true,
            updatedAt: true,
          },
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

const deleteTransaction = async (
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
        prismaClient.transaction.delete({
          where: { id },
          select: {
            id: true,
            date: true,
            amount: true,
            currentCategory: { select: { name: true } },
            targetCategory: { select: { name: true } },
            currentContainer: { select: { name: true } },
            targetContainer: { select: { name: true } },
            TransactionType: { select: { name: true } },
            Status: { select: { name: true } },
            documentId: true,
            createdAt: true,
            updatedAt: true,
          },
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

export {
  getTransactions,
  getTransaction,
  postTransaction,
  editTransaction,
  deleteTransaction,
};
