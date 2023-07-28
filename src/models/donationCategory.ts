import {
  IDonationCategory,
  IDonation,
  IExpense,
  BasicModel,
} from './interfaces';

export interface DonationCategory {
  id: number;
  name: string;
  carryover: number;
  donations: IDonation[];
  expenses: IExpense[];
}

export const donationCategoryMapper = (
  donationCategories: IDonationCategory[],
  referenced?: boolean,
): DonationCategory[] | BasicModel[] => {
  const donationCategoryDTOs = donationCategories.map((donationCategory) => {
    const { id, name, carryover, donations, expenses } = donationCategory;
    if (!referenced) {
      const donationCategoryDTO: DonationCategory = {
        id,
        name,
        carryover,
        donations,
        expenses,
      };
      return donationCategoryDTO;
    }

    return { id, name };
  });
  return donationCategoryDTOs;
};

export default donationCategoryMapper;
