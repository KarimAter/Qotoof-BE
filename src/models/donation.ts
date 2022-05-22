export interface IDonation {
  donationId: number;
  date: string;
  amount: number;
  category: string;
  status: string;
  payment: string;
  comment: string;
  donor: string;
}

export default IDonation;
