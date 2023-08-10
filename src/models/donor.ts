/* eslint-disable prefer-destructuring */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable import/no-named-as-default */
import { HumanModel, IDonation, IDonor } from './interfaces';
import Referral, { referralMapper } from './referral';

export interface Donor {
  id: number;
  shortName: string;
  firstName?: string;
  lastName?: string;
  fullName?: string;
  referral: Referral | HumanModel;
  donations: IDonation[];
}
export const donorMapper = (
  donors: IDonor[],
  referenced?: boolean,
): Donor[] | HumanModel[] => {
  const donorDTOs = donors.map((donor) => {
    const {
      id,
      short_name: shortName,
      first_name: firstName,
      last_name: lastName,
      full_name: fullName,
      referral,
      donations,
    } = donor;
    if (!referenced) {
      const donorDTO: Donor = {
        id,
        shortName,
        firstName,
        lastName,
        fullName,
        referral: referralMapper([referral], true)[0],
        donations,
      };
      return donorDTO;
    }
    return { id, shortName };
  });
  return donorDTOs;
};
