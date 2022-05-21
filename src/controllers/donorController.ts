import { NextFunction, Request, Response } from 'express';
import Donor, { IDonor } from '../models/Donor';

const postDonor = (req: Request, res: Response, next: NextFunction) => {
  const { name, referal } = req.body as IDonor;
  Donor.create({
    name,
    referal,
  })
    .then((result) => {
      console.log(result);
      res.json({ message: ` Donor ${name} added successfully` });
    })
    .catch((err) => console.log(err));
};

export default postDonor;
