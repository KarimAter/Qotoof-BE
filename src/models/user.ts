import { UserRole } from '@prisma/client';
import userRole from '../utils/Constants';

import { HumanModel, IUser } from './interfaces';

export interface User {
  id: number;
  shortName: string;
  firstName?: string;
  lastName?: string;
  fullName?: string;
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
): User[] | HumanModel[] => {
  const userDTOs = users.map((user) => {
    const {
      id,
      short_name: shortName,
      first_name: firstName,
      last_name: lastName,
      full_name: fullName,
      role,
    } = user;
    if (!referenced) {
      const userDTO: User = {
        id,
        shortName,
        firstName,
        lastName,
        fullName,
        role,
      };
      return userDTO;
    }
    return { id, shortName };
  });
  return userDTOs;
};

export default userMapper;
