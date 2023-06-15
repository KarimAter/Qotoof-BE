enum UserRole {
  'GUEST' = 0,
  'EDITOR' = 1,
  'ADMIN' = 2,
  'SUPER' = 3,
}

export default UserRole;

export type CashInType = { _sum: { amount: number }; category: string };
export type CashOutType = { _sum: { amount: number }; incategory: string };
export type CategoryBalance = {
  category: string;
  balance: number;
};

export const categoryCarryover = [
  { category: 'General', balance: -1815 },
  { category: 'Zakat', balance: 13525 },
  { category: 'Pharmacy', balance: 0 },
  { category: 'Meat', balance: 0 },
  { category: 'Chicken', balance: 0 },
  { category: 'Fruits', balance: 0 },
  { category: 'Bags', balance: 0 },
  { category: 'Meal', balance: 0 },
  { category: 'Food', balance: 0 },
  { category: 'Clothes', balance: 0 },
  { category: 'Hospital', balance: 0 },
  { category: 'Mosque', balance: 0 },
  { category: 'Logistics', balance: 0 },
  { category: 'Loans', balance: 0 },
  { category: 'Housing', balance: 0 },
  { category: 'WaterPipes', balance: 600 },
  { category: 'Marriage', balance: 0 },
  { category: 'ZakatFitr', balance: 0 },
  { category: 'TemporaryAid', balance: 0 },
  { category: 'MonthlyAid', balance: 0 },
  { category: 'Orphans', balance: 0 },
  { category: 'Treatment', balance: 0 },
  { category: 'Projects', balance: 0 },
  { category: 'Other', balance: 1300 },
];
