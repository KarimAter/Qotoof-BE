/* eslint-disable import/no-cycle */
import { Beneficiary } from './beneficiary';
import { Category } from './category';
import { BasicModel, HumanModel } from './interfaces';
import { PaymentContainer } from './paymentContainer';
import { Status } from './status';
import { User } from './user';

export interface Expense {
  id: string;
  serialNumber: number;
  date: string;
  amount: number;
  donationCategory: BasicModel | Category;
  expenseCategory: BasicModel | Status | BasicModel;
  paymentContainer: PaymentContainer | BasicModel;
  beneficiary: Beneficiary | HumanModel;
  user: User | HumanModel;
  status: Status | BasicModel;
  project?: string;
  comment?: string;
  invoiceId?: string;
}

export default Expense;
