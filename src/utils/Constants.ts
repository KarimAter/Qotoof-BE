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
