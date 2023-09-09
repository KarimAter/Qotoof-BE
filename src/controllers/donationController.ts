import { NextFunction, Request, Response } from 'express';
import { validationResult } from 'express-validator';
// eslint-disable-next-line import/no-named-as-default
import { Donation } from '../models/donation';
import prismaClient from '../utils/databaseConnector';
import prismaOperation from '../utils/helperFunctions';
import ValidationError from '../middleware/Errors/InvalidRequestError';

const postDonation = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const {
    date,
    amount,
    donationCategory,
    donor,
    paymentContainer,
    status,
    comment,
    receiptId,
    serialNumber,
  }: Donation = req.body;

  const errors = validationResult(req);
  try {
    if (!errors.isEmpty()) {
      throw new ValidationError('Invalid input', errors);
    }

    const result = await prismaOperation(
      () =>
        prismaClient.$transaction(async (tx) => {
          const transactionalDonation = tx.donation.create({
            data: {
              date: new Date(date),
              amount,
              donorId: donor.id,
              donationCategoryId: donationCategory.id,
              containerId: paymentContainer.id,
              statusId: status.id,
              comment,
              receiptId,
              serialNumber,
            },
            select: {
              id: true,
              serialNumber: true,
              date: true,
              amount: true,
              donor: { select: { shortName: true } },
              donationCategory: { select: { name: true } },
              paymentContainer: { select: { name: true } },
              status: { select: { name: true } },
              comment: true,
              receiptId: true,
              createdAt: true,
              updatedAt: true,
            },
          });
          // TODO: To figure out a solution for the hardcoded transactionTypeId
          const trans = await tx.transaction.create({
            data: {
              id: (await transactionalDonation).id,
              date: new Date(date),
              amount,
              currentCategoryId: donationCategory.id,
              currentContainerId: paymentContainer.id,
              targetContainerId: paymentContainer.id,
              transactionTypeId: 'cllekbjbj0000c49kfq8wotl5',
              statusId: status.id,
              documentId: receiptId,
            },
          });
          return transactionalDonation;
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
const getDonations = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const result = await prismaOperation(
    () =>
      prismaClient.donation.findMany({
        select: {
          serialNumber: true,
          date: true,
          amount: true,
          donor: { select: { shortName: true } },
          donationCategory: { select: { name: true } },
          paymentContainer: { select: { name: true } },
          status: { select: { name: true } },
          comment: true,
          receiptId: true,
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
const getDonation = async (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  const { id } = req.params;
  try {
    if (!errors.isEmpty()) {
      throw new ValidationError('Invalid input', errors);
    }

    const result = await prismaOperation(
      () =>
        prismaClient.donation.findUnique({
          where: { id },
          select: {
            serialNumber: true,
            date: true,
            amount: true,
            donor: { select: { shortName: true } },
            donationCategory: { select: { name: true } },
            paymentContainer: { select: { name: true } },
            status: { select: { name: true } },
            comment: true,
            receiptId: true,
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

  // prismaClient.donation.aggregate({
  // _sum: { amount: true },
  // where: { donorId: Number(id) },
};

const editDonation = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const errors = validationResult(req);
  const { id } = req.params;

  const {
    date,
    amount,
    donationCategory,
    donor,
    paymentContainer,
    status,
    comment,
    receiptId,
  }: Donation = req.body;

  try {
    if (!errors.isEmpty()) {
      throw new ValidationError('Invalid input', errors);
    }

    const result = await prismaOperation(
      () =>
        prismaClient.donation.update({
          where: { id },
          data: {
            date: new Date(date),
            amount,
            donorId: donor.id,
            donationCategoryId: donationCategory.id,
            containerId: paymentContainer.id,
            statusId: status.id,
            comment,
            receiptId,
          },
          select: {
            serialNumber: true,
            date: true,
            amount: true,
            donor: { select: { shortName: true } },
            donationCategory: { select: { name: true } },
            paymentContainer: { select: { name: true } },
            status: { select: { name: true } },
            comment: true,
            receiptId: true,
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

const deleteDonation = async (
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
        prismaClient.donation.delete({
          where: { id },
          select: {
            serialNumber: true,
            date: true,
            amount: true,
            donor: { select: { shortName: true } },
            donationCategory: { select: { name: true } },
            paymentContainer: { select: { name: true } },
            status: { select: { name: true } },
            comment: true,
            receiptId: true,
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

  // prismaOperation(
  //   () =>
  //     prismaClient.donation.deleteMany({
  //       where: { id: { in: ids } },
  //     }),
  //   res,
  //   next,
  // );
};

export {
  postDonation,
  getDonations,
  getDonation,
  editDonation,
  deleteDonation,
};
