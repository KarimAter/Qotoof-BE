import { NextFunction, Request, Response } from 'express';
import { IDonation } from '../models/donation';
import Donor from '../models/donor';

const postDonation = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { donation, donorId } = req.body as {
    donation: IDonation;
    donorId: number;
  };
  const {
 amount, category, comment, date, payment, status,
} = donation;

  const donorName = await Donor.findByPk(donorId);
  const donor = donorName ? donorName.name : '';

  await donorName?.createDonation({
    amount,
    category,
    comment,
    date,
    payment,
    donor,
    status,
  });

  const ds = await donorName?.getDonations();

  const x = ds?.[0];
  console.log('donation[0]:', x);

  const y = await x?.getDonor();

  console.log('getDonor:', y);
  res.json({ message: ` Donation  added successfully` });
};

export default postDonation;
