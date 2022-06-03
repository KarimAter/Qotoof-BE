import UserRole from '../utils/Constants';

export interface IUser {
  id: number;
  name: string;
  email?: string;
  password?: string;
  role: 'SUPER' | 'ADMIN' | 'EDITOR' | 'GUEST';

}

export default IUser;
