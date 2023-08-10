/* eslint-disable @typescript-eslint/naming-convention */
import { IReferral, IDonor, HumanModel } from './interfaces';

export interface Referral {
  id: number;
  shortName: string;
  firstName?: string;
  lastName?: string;
  fullName?: string;
  referredDonors: IDonor[];
}

export const referralMapper = (
  referrals: IReferral[],
  referenced?: boolean,
): (Referral | HumanModel)[] => {
  const referralDTOs = referrals.map((referral) => {
    const {
      id,
      short_name: shortName,
      first_name: firstName,
      last_name: lastName,
      full_name: fullName,
      referredDonors,
    } = referral;
    if (!referenced) {
      const referralDTO: Referral = {
        id,
        shortName,
        firstName,
        lastName,
        fullName,
        referredDonors,
      };
      return referralDTO;
    }
    return { id, shortName };
  });
  return referralDTOs;
};

export default Referral;
