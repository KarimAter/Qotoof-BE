import { NextFunction, Request, Response } from 'express';
import Donation, { IDonation } from '../models/donation';

const postDonation = (req: Request, res: Response, next: NextFunction) => {
  const {
       amount, category, comment, date, donor, payment, status,
    } = req.body as IDonation;
  Donation.create({
    amount,
    category,
    comment,
    date,
    donor,
    payment,
    status,
  })
    .then((result) => {
      console.log(result);
      res.json({ message: ` Donation ${result.id} added successfully` });
    })
    .catch((err) => console.log(err));
};

export default postDonation;
