/* eslint-disable import/no-cycle */
import { Donation } from './donation';
import { BasicModel, HumanModel } from './interfaces';
import { Referral } from './referral';

export interface Donor {
  id: string;
  shortName: string;
  firstName?: string;
  lastName?: string;
  fullName?: string;
  referral: Referral | HumanModel;
  donations: Donation[] | BasicModel[];
}
