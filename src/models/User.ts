/* eslint-disable @typescript-eslint/no-empty-interface */
import { Sequelize, DataType, Model } from 'sequelize-typescript';
import { DataTypes, Optional } from 'sequelize/types';
import UserRole from '../utils/Constants';
import sequelize from '../utils/databaseConnector';

export interface IUser {
  id: number;
  name: string;
  email?: string;
  password?: string;
  role: UserRole;
}

interface UserCreationAttributes extends Optional<IUser, 'id'> {}

interface UserInstance extends Model<IUser, UserCreationAttributes>, IUser {
  id: number;
}

const User = sequelize.define<UserInstance>('User', {
  id: {
    type: DataType.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  name: { type: DataType.STRING },
  email: { type: DataType.STRING },
  password: { type: DataType.STRING },
  role: { type: DataType.ENUM, values: Object.keys(UserRole) },
});

export default User;
