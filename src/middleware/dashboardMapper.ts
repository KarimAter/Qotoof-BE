/* eslint-disable @typescript-eslint/no-loop-func */
import { NextFunction, Request, Response } from 'express';

type IRawBalance = {
  categoryId: string;
  categoryName: string;
  inOnly: number;
  categoryLevel: number;
  parentId: string;
  breakdown: string | null;
  totalBalance: number;
};

type PaymentContainer = Record<string, number>;

type AggregatePaymentStatus = Record<
  string,
  {
    statusTotal: number;
    containersBreakdown: PaymentContainer[];
  }
>;
type DetailedBalance = {
  categoryId: string;
  categoryName: string;
  inOnly: number;
  categoryLevel: number;
  parentId: string;
  totalAmount: number;
  details: AggregatePaymentStatus;
};

type ConsolidatedCategoryDetail = DetailedBalance & {
  subCategories: ConsolidatedCategoryDetail[];
};

const breakdownMapper = (breakdown: string | null): AggregatePaymentStatus => {
  const aggregatePaymentStatus: AggregatePaymentStatus = {};
  const splitedBreakdown = breakdown?.split(',');
  splitedBreakdown?.reduce((accumaltor, current) => {
    const [status, container, amount] = current.split('_');
    const amountNumber = Number(amount);
    if (!aggregatePaymentStatus[status]) {
      aggregatePaymentStatus[status] = {
        statusTotal: amountNumber,
        containersBreakdown: [{ [container]: amountNumber }],
      };
    } else {
      aggregatePaymentStatus[status].containersBreakdown.push({
        [container]: amountNumber,
      });
      aggregatePaymentStatus[status].statusTotal += amountNumber;
    }
    return accumaltor;
  }, aggregatePaymentStatus);
  return aggregatePaymentStatus;
};

const detatledBalanceMapper = (rawBalance: IRawBalance): DetailedBalance => {
  const {
    categoryId,
    categoryName,
    inOnly,
    categoryLevel,
    parentId,
    breakdown,
    totalBalance,
  } = rawBalance;
  const detailedBalance: DetailedBalance = {
    categoryId,
    parentId,
    categoryName,
    inOnly,
    categoryLevel,
    totalAmount: totalBalance,
    details: breakdownMapper(breakdown),
  };
  return detailedBalance;
};

const categoryConsolidator = (
  detailedBalances: DetailedBalance[],
): ConsolidatedCategoryDetail[] => {
  let consolidatedCategories: ConsolidatedCategoryDetail[] = [];
  const maxLevel = detailedBalances[0].categoryLevel;
  detailedBalances.reduce((accumulator, current, index, array) => {
    consolidatedCategories = array.map((consolidatedCategory) => ({
      ...consolidatedCategory,
      subCategories: [],
    }));

    for (let i = maxLevel; i >= 0; i -= 1) {
      consolidatedCategories
        .filter(({ categoryLevel }) => categoryLevel === i)
        .forEach((consolidatedCategory) => {
          const parentIndex = consolidatedCategories.findIndex(
            ({ categoryId, categoryLevel }) =>
              categoryId === consolidatedCategory.parentId
              && categoryLevel === i - 1,
          );
          if (parentIndex !== -1) {
            consolidatedCategories[parentIndex].subCategories.push(
              consolidatedCategory,
            );
            consolidatedCategories[parentIndex].totalAmount
              += consolidatedCategory.totalAmount;
          }
        });
    }
    consolidatedCategories = consolidatedCategories.filter(
      (balance) => balance.categoryLevel === 0,
    );
    return accumulator;
  }, consolidatedCategories);
  return consolidatedCategories;
};

const dashboardMapperMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const balanceResult = req.body;
  const detailedBalances: DetailedBalance[] = balanceResult.map(
    detatledBalanceMapper,
  );
  console.log(detailedBalances);
  const dashboard = categoryConsolidator(detailedBalances);
  console.log(dashboard);
  return res.json(dashboard);
};

export default dashboardMapperMiddleware;
