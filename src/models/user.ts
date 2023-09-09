import { UserRole } from '@prisma/client';
import userRole from '../utils/Constants';
import { HumanModel, IUser } from './interfaces';
import { arrayMapper } from '../utils/helperFunctions';

export interface User {
  id: string;
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
  userEntities: IUser[] | IUser,
  referenced: boolean,
): User[] | HumanModel[] => {
  const users = arrayMapper(userEntities);
  const userDTOs = users.map((user) => {
    const { id, shortName, firstName, lastName, fullName, role } = user;
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
