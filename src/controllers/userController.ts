import { NextFunction, Request, Response } from 'express';
import User, { IUser } from '../models/user';

const postUser = (req: Request, res: Response, next: NextFunction) => {
  const {
 name, email, password, role,
} = req.body as IUser;
  // User.create({
  //   name,
  //   role,
  // })
  //   .then((result) => {
  //     console.log(result);
  //     res.json({ message: ` User ${name} added successfully` });
  //   })
  //   .catch((err) => console.log(err));
};

export default postUser;
