import { BasicModel, HumanModel, IExpense } from './interfaces';
import { donationCategoryMapper } from './donationCategory';
import { expenseCategoryMapper } from './expenseCategory';
import { userMapper } from './user';
import { beneficiaryMapper } from './beneficiary';

export interface Expense {
  id: string;
  date: string;
  amount: number;
  donationCategory: BasicModel;
  expenseCategory: BasicModel;
  status?: string;
  paymentType?: string;
  comment?: string;
  project?: string;
  user: HumanModel;
  beneficiary: HumanModel;
}
export const expenseMapper = (expenses: IExpense[]): Expense[] => {
  const expenseDTOs = expenses.map((expense) => {
    const {
      id,
      date,
      amount,

      status,
      paymentType,
      comment,
      project,
      user,
      beneficiary,
    } = expense;
    const expenseDTO: Expense = {
      id,
      date,
      amount,
      donationCategory: donationCategoryMapper(
        [expense.donation_category],
        true,
      )[0],
      expenseCategory: expenseCategoryMapper(
        [expense.expense_category],
        true,
      )[0],
      status,
      paymentType,
      comment,
      project,
      user: userMapper([user], true)[0],
      beneficiary: beneficiaryMapper([beneficiary], true)[0],
    };
    return expenseDTO;
  });
  return expenseDTOs;
};

export default Expense;
