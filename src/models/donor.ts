import { IUser } from './user';

export interface IDonor {
  donorId: number;
  name: string;
  referral: IUser;
}

export default IDonor;
