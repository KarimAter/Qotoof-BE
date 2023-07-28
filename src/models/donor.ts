/* eslint-disable prefer-destructuring */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable import/no-named-as-default */
import { BasicModel, IDonation, IDonor } from './interfaces';
import Referral, { referralMapper } from './referral';

export interface Donor {
  id: number;
  name: string;
  referral: Referral | BasicModel;
  donations: IDonation[];
}
export const donorMapper = (
  donors: IDonor[],
  referenced?: boolean,
): Donor[] | BasicModel[] => {
  const donorDTOs = donors.map((donor) => {
    const { id, short_name: name, referral, donations } = donor;
    if (!referenced) {
      const donorDTO: Donor = {
        id,
        name,
        referral: referralMapper([referral], true)[0],
        donations,
      };
      return donorDTO;
    }
    return { id, name };
  });
  return donorDTOs;
};
