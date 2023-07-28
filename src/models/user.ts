import { UserRole } from '@prisma/client';
import userRole from '../utils/Constants';

import { BasicModel, IUser } from './interfaces';

export interface User {
  id: number;
  name: string;
  email?: string;
  password?: string;
  role: userRole;
}

export const userRoleMapper = (uRole: userRole): UserRole => {
  let role: UserRole;
  console.log(uRole.toString());
  switch (uRole.toString()) {
    case 'ADMIN':
      role = UserRole.ADMIN;
      console.log('admin');
      break;
    case 'SUPER':
      role = UserRole.SUPER;
      console.log('super');

      break;
    case 'GUEST':
      role = UserRole.GUEST;
      console.log('gue1');

      break;
    case 'EDITOR':
      role = UserRole.EDITOR;
      console.log('ed');

      break;
    default:
      role = UserRole.GUEST;
      console.log('guest');
  }
  return role;
};

export const userMapper = (
  users: IUser[],
  referenced: boolean,
): User[] | BasicModel[] => {
  const userDTOs = users.map((user) => {
    const { id, short_name: name, role } = user;
    if (!referenced) {
      const userDTO: User = {
        id,
        name,
        role,
      };
      return userDTO;
    }
    return { id, name };
  });
  return userDTOs;
};

export default userMapper;
