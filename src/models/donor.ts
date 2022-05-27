import { IUser } from './user';

export interface IDonor {
  id: number;
  name: string;
  referral: IUser;
}

export default IDonor;
