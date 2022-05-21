/* eslint-disable @typescript-eslint/no-empty-interface */
import { Sequelize, DataType, Model } from 'sequelize-typescript';
import { DataTypes, Optional } from 'sequelize/types';
import DonorRole from '../utils/Constants';
import sequelize from '../utils/databaseConnector';
import { IUser } from './user';

export interface IDonor {
  id: number;
  name: string;
  referal: IUser;
}

interface DonorCreationAttributes extends Optional<IDonor, 'id'> {}

interface DonorInstance extends Model<IDonor, DonorCreationAttributes>, IDonor {
  id: number;
}

const Donor = sequelize.define<DonorInstance>('Donor', {
  id: {
    type: DataType.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  name: { type: DataType.STRING },
  referal: { type: DataType.STRING },
});

export default Donor;
