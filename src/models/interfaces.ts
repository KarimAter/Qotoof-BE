/* eslint-disable @typescript-eslint/no-explicit-any */
import userRole from '../utils/Constants';
// import { MyPaymentType } from './paymentContainer';

export interface HumanModel {
  id: string;
  shortName: string;
}
export interface BasicModel {
  id: string;
  name: string;
}

export interface IBeneficiary {
  id: string;
  shortName: string;
  firstName?: string;
  lastName?: string;
  fullName?: string;
  age?: number;
  maritalStatus?: string;
  address?: string;
  expenses?: IExpense[];
}
export interface IReferral {
  id: string;
  shortName: string;
  firstName?: string;
  lastName?: string;
  fullName?: string;
  referredDonors: IDonor[];
}
export interface IDonor {
  id: string;
  shortName: string;
  firstName?: string;
  lastName?: string;
  fullName?: string;
  referral: IReferral;
  donations: IDonation[];
}

export interface IUser {
  id: string;
  shortName: string;
  firstName?: string;
  lastName?: string;
  fullName?: string;
  email: string;
  password: string;
  role: userRole;
}

export interface ICategory {
  id: string;
  name: string;
  inOnly: boolean;
  parentId: string;
  level: number;
  carryover: number;
  currentTransacions: ITransaction[];
  targetTransacions: ITransaction[];
  Donation: IDonation[];
  expenseFrom: IExpense[];
  expenseTo: IExpense[];
}

export interface ITransactionType {
  id: string;
  name: string;
  transactions: ITransaction[];
  createdAt: string;
  updatedAt: string;
}

export interface ITransaction {
  id: string;
  date: string;
  amount: number;
  transactionType: ITransactionType;
  currentCategory: ICategory;
  targetCategory: ICategory;
  currentContainer: IPaymentContainer;
  targetContainer: IPaymentContainer;
  status: IStatus;
  currentCategoryId: string;
  targetCategoryId: string;
  currentContainerId: string;
  targetContainerId: string;
  transactionTypeId: string;
  statusId: string;
  documentId?: string;
  createdAt: string;
  updatedAt: string;
}

export interface IDonation {
  id: string;
  serialNumber: number;
  date: string;
  amount: number;
  donor: IDonor;
  donationCategory: ICategory;
  paymentContainer: IPaymentContainer;
  status: IStatus;
  comment?: string;
  receiptId?: string;
  createdAt: string;
  updatedAt: string;
}
export interface IExpense {
  id: string;
  serialNumber: number;
  date: string;
  amount: number;
  donationCategory: ICategory;
  expenseCategory: ICategory;
  paymentContainer: IPaymentContainer;
  beneficiary: IBeneficiary;
  user: IUser;
  status: IStatus;
  project?: string;
  comment?: string;
  invoiceId?: string;
  createdAt: string;
  updatedAt: string;
}

export interface IPaymentContainer {
  id: string;
  name: string;
  donations: IDonation[];
  expenses: IExpense[];
  currentTransactions: ITransaction[];
  targetTransactions: ITransaction[];
  createdAt: string;
  updatedAt: string;
}

export interface IStatus {
  id: string;
  name: string;
  transactions: ITransaction[];
  donations: IDonation[];
  expenses: IExpense[];
  createdAt: string;
  updatedAt: string;
}
