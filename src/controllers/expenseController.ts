import { NextFunction, Request, Response } from 'express';
import { validationResult } from 'express-validator';
import { randomUUID } from 'crypto';
import prismaClient from '../utils/databaseConnector';
import prismaOperation from '../utils/helperFunctions';
import { Expense } from '../models/expense';
import ValidationError from '../middleware/Errors/InvalidRequestError';

const postExpense = async (req: Request, res: Response, next: NextFunction) => {
  const {
    date,
    amount,
    donationCategory,
    expenseCategory,
    comment,
    paymentContainer,
    project,
    status,
    user,
    beneficiary,
    invoiceId,
  }: Expense = req.body;

  const errors = validationResult(req);
  try {
    if (!errors.isEmpty()) {
      throw new ValidationError('Invalid input', errors);
    }

    const xx = randomUUID();
// TODO: Add transactional logic
    const result = await prismaOperation(
      () =>
        prismaClient.$transaction(async (tx) => {
          const transactionalExpense = tx.expense.create({
            data: {
              date: new Date(date),
              amount,
              comment,
              project,
              statusId: status.id,
              donationCategoryId: donationCategory.id,
              expenseCategoryId: expenseCategory.id,
              containerId: paymentContainer.id,
              userId: user.id,
              beneficiaryId: beneficiary.id,
              invoiceId,
            },
            select: {
              id: true,
              serialNumber: true,
              date: true,
              amount: true,
              donationCategory: { select: { name: true } },
              expenseCategory: { select: { name: true } },
              beneficiary: { select: { shortName: true } },
              paymentContainer: { select: { name: true } },
              status: { select: { name: true } },
              comment: true,
              project: true,
              user: { select: { shortName: true } },
              invoiceId: true,
            },
          });
          // TODO: To figure out a solution for the hardcoded transactionTypeId
          const trans = await tx.transaction.create({
            data: {
              id: (await transactionalExpense).id,
              date: new Date(date),
              amount: amount * -1,
              currentCategoryId: donationCategory.id,
              targetCategoryId: expenseCategory.id,
              currentContainerId: paymentContainer.id,
              targetContainerId: paymentContainer.id,
              transactionTypeId: 'cllem28lw0000c4ehh6xba2ro',
              statusId: status.id,
              documentId: invoiceId,
            },
          });
          return transactionalExpense;
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
const getExpenses = async (req: Request, res: Response, next: NextFunction) => {
  const result = await prismaOperation(
    () =>
      prismaClient.expense.findMany({
        select: {
          serialNumber: true,
          date: true,
          amount: true,
          donationCategory: { select: { name: true } },
          expenseCategory: { select: { name: true } },
          beneficiary: { select: { shortName: true } },
          paymentContainer: { select: { name: true } },
          status: { select: { name: true } },
          comment: true,
          project: true,
          user: { select: { shortName: true } },
        },
      }),
    res,
    next,
  );
  req.body = result;
  next();
};

const getExpense = async (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  const { id } = req.params;
  try {
    if (!errors.isEmpty()) {
      throw new ValidationError('Invalid input', errors);
    }

    const result = await prismaOperation(
      () =>
        prismaClient.expense.findUnique({
          where: { id },
          select: {
            serialNumber: true,
            date: true,
            amount: true,
            donationCategory: { select: { name: true } },
            expenseCategory: { select: { name: true } },
            beneficiary: { select: { shortName: true } },
            paymentContainer: { select: { name: true } },
            status: { select: { name: true } },
            comment: true,
            project: true,
            user: { select: { shortName: true } },
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

  // prismaClient.donation.aggregate({
  // _sum: { amount: true },
  // where: { donorId: Number(id) },
};

const editExpense = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;

  const errors = validationResult(req);

  const {
    serialNumber,
    date,
    amount,
    expenseCategory,
    donationCategory,
    comment,
    beneficiary,
    paymentContainer,
    project,
    user,
    status,
    invoiceId,
  }: Expense = req.body;

  try {
    if (!errors.isEmpty()) {
      throw new ValidationError('Invalid input', errors);
    }

    const result = await prismaOperation(
      () =>
        prismaClient.$transaction(async (tx) => {
          const transactionalExpense = tx.expense.update({
            where: { id },
            data: {
              date: new Date(date),
              amount,
              comment,
              project,
              statusId: status.id,
              donationCategoryId: donationCategory.id,
              expenseCategoryId: expenseCategory.id,
              containerId: paymentContainer.id,
              userId: user.id,
              beneficiaryId: beneficiary.id,
              invoiceId,
              serialNumber,
            },
            select: {
              id: true,
              serialNumber: true,
              date: true,
              amount: true,
              donationCategory: { select: { name: true } },
              expenseCategory: { select: { name: true } },
              beneficiary: { select: { shortName: true } },
              paymentContainer: { select: { name: true } },
              status: { select: { name: true } },
              comment: true,
              project: true,
              user: { select: { shortName: true } },
              invoiceId: true,
            },
          });

          const trans = await tx.transaction.update({
            where: { id },
            data: {
              date: new Date(date),
              amount: amount * -1,
              currentCategoryId: donationCategory.id,
              targetCategoryId: expenseCategory.id,
              currentContainerId: paymentContainer.id,
              targetContainerId: paymentContainer.id,
              transactionTypeId: 'cllem28lw0000c4ehh6xba2ro',
              statusId: status.id,
              documentId: invoiceId,
            },
          });
          return transactionalExpense;
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

const deleteExpense = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { id } = req.params;
  const errors = validationResult(req);
  try {
    if (!errors.isEmpty()) {
      throw new ValidationError('Invalid input', errors);
    }

    const result = await prismaOperation(
      () =>
        prismaClient.$transaction(async (tx) => {
          const transactionalExpense = tx.expense.delete({
            where: { id },
            select: {
              id: true,
              serialNumber: true,
              date: true,
              amount: true,
              donationCategory: { select: { name: true } },
              expenseCategory: { select: { name: true } },
              beneficiary: { select: { shortName: true } },
              paymentContainer: { select: { name: true } },
              status: { select: { name: true } },
              comment: true,
              project: true,
              user: { select: { shortName: true } },
              invoiceId: true,
            },
          });

          const trans = await tx.transaction.delete({
            where: {
              id: (await transactionalExpense).id,
            },
          });
          return transactionalExpense;
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

export { postExpense, getExpenses, editExpense, deleteExpense, getExpense };
