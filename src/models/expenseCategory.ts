import { BasicModel, IExpense, IExpenseCategory } from './interfaces';

export interface ExpenseCategory {
  id: number;
  name: string;
  carryover: number;
  expenses: IExpense[];
}

export const expenseCategoryMapper = (
  expenseCategories: IExpenseCategory[],
  referenced?: boolean,
): ExpenseCategory[] | BasicModel[] => {
  const expenseCategoryDTOs = expenseCategories.map((expenseCategory) => {
    const { id, name, carryover, expenses } = expenseCategory;
    if (!referenced) {
      const expenseCategoryDTO: ExpenseCategory = {
        id,
        name,
        carryover,
        expenses,
      };
      return expenseCategoryDTO;
    }
    return { id, name };
  });
  return expenseCategoryDTOs;
};

export default expenseCategoryMapper;
