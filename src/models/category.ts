/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable import/no-cycle */
import { Donation } from './donation';
import { Expense } from './expense';
import {
    BasicModel,
} from './interfaces';
import { Transaction } from './transaction';

export interface Category {
  id: string;
  name: string;
  inOnly: boolean;
  parentId: string;
  level: number;
  carryover: number;
  currentTransacions: Transaction[] | BasicModel[];
  targetTransacions: Transaction[] | BasicModel[];
  Donation: Donation[] | BasicModel[];
  expenseFrom: Expense[] | BasicModel[];
  expenseTo: Expense[] | BasicModel[];
}
