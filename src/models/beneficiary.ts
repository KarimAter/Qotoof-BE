/* eslint-disable import/no-cycle */
import { IBeneficiary, IExpense } from './interfaces';

export interface Beneficiary {
  id: number;
  shortName: string;
  firstName?: string;
  lastName?: string;
  fullName?: string;
  age?: number;
  maritalStatus?: string;
  address?: string;
  expenses?: IExpense[];
}

export const beneficiaryMapper = (
  beneficiaries: IBeneficiary[],
  referenced: boolean,
): Beneficiary[] => {
  const beneficiariesDTOs = beneficiaries.map((beneficiary) => {
    const {
      id,
      short_name: shortName,
      first_name: firstName,
      last_name: lastName,
      full_name: fullName,
      age,
      marital_status: maritalStatus,
      address,
      expenses,
    } = beneficiary;
    if (!referenced) {
      const beneficiariesDTO: Beneficiary = {
        id,
        shortName,
        firstName,
        lastName,
        fullName,
        age,
        maritalStatus,
        address,
        expenses,
      };
      return beneficiariesDTO;
    }
    return { id, shortName };
  });
  return beneficiariesDTOs;
};
