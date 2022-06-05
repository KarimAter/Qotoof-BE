import { IDonor } from './donor';

export interface IDonation {
  id: number;
  date: string;
  amount: number;
  category: string;
  status: string;
  payment: string;
  comment: string;
  donor: IDonor;
}

export default IDonation;
