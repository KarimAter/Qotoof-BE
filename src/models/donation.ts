/* eslint-disable import/no-cycle */
import { Category } from './category';
import { Donor } from './donor';
import { BasicModel, HumanModel } from './interfaces';
import { PaymentContainer } from './paymentContainer';
import { Status } from './status';

export interface Donation {
  id: string;
  serialNumber: number;
  date: string;
  amount: number;
  donor: Donor | HumanModel;
  donationCategory: Category | BasicModel;
  paymentContainer: PaymentContainer | BasicModel;
  status: Status | BasicModel;
  comment?: string;
  receiptId?: string;
}
