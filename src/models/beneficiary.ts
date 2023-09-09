/* eslint-disable import/no-cycle */
import { Expense } from './expense';
import { BasicModel } from './interfaces';

export interface Beneficiary {
  id: string;
  shortName: string;
  firstName?: string;
  lastName?: string;
  fullName?: string;
  age?: number;
  maritalStatus?: string;
  address?: string;
  expenses?: Expense[] | BasicModel[];
}
