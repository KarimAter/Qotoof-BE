/* eslint-disable @typescript-eslint/naming-convention */
import { IReferral, IDonor, BasicModel } from './interfaces';

export interface Referral {
  id: number;
  shortName: string;
  firstName: string;
  lastName: string;
  referredDonors: IDonor[];
}

export const referralMapper = (
  referrals: IReferral[],
  referenced?: boolean,
): (Referral | BasicModel)[] => {
  const referralDTOs = referrals.map((referral) => {
    const {
      id,
      short_name: shortName,
      first_name: firstName,
      last_name: lastName,
      referredDonors,
    } = referral;
    if (!referenced) {
      const referralDTO: Referral = {
        id,
        shortName,
        firstName,
        lastName,
        referredDonors,
      };
      return referralDTO;
    }
    return { id, name: shortName };
  });
  return referralDTOs;
};

export default Referral;
