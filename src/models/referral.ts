export interface Referral {
  id: string;
  shortName: string;
  firstName?: string;
  lastName?: string;
  fullName?: string;
  // referredDonors: IDonor[];
}
export default Referral;
