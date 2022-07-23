import { IDonor } from './donor';

export interface IDonation {
  id: number;
  date: string;
  amount: number;
  category:
      'General'
    | 'Zakat'
    | 'Pharmacy'
    | 'Meat'
    | 'Chicken'
    | 'Fruits'
    | 'Bags'
    | 'Meal'
    | 'Food'
    | 'Clothes'
    | 'Hospital'
    | 'Mosque'
    | 'Logistics'
    | 'Loans'
    | 'Housing'
    | 'WaterPipes'
    | 'Marriage'
    | 'ZakatFitr'
    | 'TemporaryAid'
    | 'MonthlyAid'
    | 'Orphans'
    | 'Treatment'
    | 'Projects'
    | 'Other';
  status: string;
  payment: string;
  comment: string;
  donor: IDonor;
}

export default IDonation;
