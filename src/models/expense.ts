import { IBeneficiary } from './beneficiary';
import { IUser } from './user';

export interface IExpense {
  id: number;
  date: string;
  amount: number;
  incategory:
    | 'General'
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
  outcategory:
      'Medication'
    | 'Treatment'
    | 'MedicalAid'
    | 'Marriage'
    | 'Projects'
    | 'Meat'
    | 'Adahy'
    | 'Bags'
    | 'Chicken'
    | 'Transportation'
    | 'HousingProject'
    | 'LoansSettling'
    | 'Meals'
    | 'Mosque'
    | 'WaterPipes'
    | 'ZakatFitr';
  status: string;
  paymentType: string;
  comment: string;
  project: string;
  user: IUser;
  beneficiary: IBeneficiary;
}

export default IExpense;
