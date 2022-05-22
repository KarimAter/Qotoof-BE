import UserRole from '../utils/Constants';

export interface IUser {
  id: number;
  name: string;
  email?: string;
  password?: string;
  role: UserRole;
}

export default IUser;
