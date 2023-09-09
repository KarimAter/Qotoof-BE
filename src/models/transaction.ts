/* eslint-disable import/no-cycle */
import { Category } from './category';
import { BasicModel } from './interfaces';
import { PaymentContainer } from './paymentContainer';
import { Status } from './status';

export interface Transaction {
  id: string;
  date: string;
  amount: number;
  currentCategory: Category | BasicModel;
  targetCategory: Category | BasicModel;
  currentContainer: PaymentContainer | BasicModel;
  targetContainer: PaymentContainer | BasicModel;
  transactionType: Transaction | BasicModel;
  status: Status | BasicModel;
  documentId?: string;
}
