import { IBeneficiary } from './beneficiary';
import { IUser } from './user';

export interface IExpense {
  expenseId: number;
  date: string;
  amount: number;
  category: string;
  status: string;
  paymentType: string;
  comment: string;
  project: string;
  user: IUser;
  beneficiary: IBeneficiary;
}

export default IExpense;
