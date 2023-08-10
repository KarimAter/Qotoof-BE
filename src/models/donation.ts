import { BasicModel, HumanModel, IDonation } from './interfaces';
import { Donor, donorMapper } from './donor';
// eslint-disable-next-line import/no-named-as-default
import donationCategoryMapper, { DonationCategory } from './donationCategory';

export interface Donation {
  id: string;
  date: string;
  amount: number;
  donationCategory: BasicModel;
  donor: HumanModel;
}

export const donationMapper = (donations: IDonation[]): Donation[] => {
  const donationDTOs = donations.map((donation) => {
    const donationDTO: Donation = {
      id: donation.id,
      date: donation.date,
      amount: donation.amount,
      donationCategory: donationCategoryMapper(
        [donation.donation_category],
        true,
      )[0],
      donor: donorMapper([donation.donor], true)[0],
    };
    return donationDTO;
  });
  return donationDTOs;
};

export default Donation;
