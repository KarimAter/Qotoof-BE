/* eslint-disable @typescript-eslint/no-explicit-any */
import userRole from '../utils/Constants';

export interface HumanModel {
  id: number;
  shortName: string;
}
export interface BasicModel {
  id: number;
  name: string;
}

export interface IBeneficiary {
  id: number;
  short_name: string;
  first_name?: string;
  last_name?: string;
  full_name?: string;
  age?: number;
  marital_status?: string;
  address?: string;
  expenses?: IExpense[];
}
export interface IReferral {
  id: number;
  short_name: string;
  first_name?: string;
  last_name?: string;
  full_name?: string;
  referredDonors: IDonor[];
}
export interface IDonor {
  id: number;
  short_name: string;
  first_name?: string;
  last_name?: string;
  full_name?: string;
  referral: IReferral;
  donations: IDonation[];
}

export interface IUser {
  id: number;
  short_name: string;
  first_name?: string;
  last_name?: string;
  full_name?: string;
  email?: string;
  password?: string;
  role: userRole;
}

export interface IDonationCategory {
  id: number;
  name: string;
  carryover: number;
  donations: IDonation[];
  expenses: IExpense[];
}
export interface IExpenseCategory {
  id: number;
  name: string;
  carryover: number;
  expenses: IExpense[];
}

export interface IDonation {
  id: string;
  date: string;
  amount: number;
  donation_category: IDonationCategory;
  donor: IDonor;
  // status?: string;
  // payment?: string;
  // comment?: string;
}

export interface IExpense {
  id: string;
  date: string;
  amount: number;
  donation_category: IDonationCategory;
  expense_category: IExpenseCategory;
  status: string;
  paymentType: string;
  comment: string;
  project: string;
  user: IUser;
  beneficiary: IBeneficiary;
}

export type CategoryBalance = {
  category: string;
  balance: number;
};
