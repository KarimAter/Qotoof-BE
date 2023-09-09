/* eslint-disable import/no-cycle */
import { Donation } from './donation';
import { Expense } from './expense';
import { BasicModel } from './interfaces';
import { Transaction } from './transaction';

export interface Status {
  id: string;
  name: string;
  transactions: Transaction[] | BasicModel[];
  Donation: Donation[] | BasicModel[];
  Expense: Expense[] | BasicModel[];
  createdAt: string;
  updatedAt: string;
}
