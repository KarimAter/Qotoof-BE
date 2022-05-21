/* eslint-disable @typescript-eslint/no-empty-interface */
import { Sequelize, DataType, Model } from 'sequelize-typescript';
import { DataTypes, Optional } from 'sequelize/types';
import DonationRole from '../utils/Constants';
import sequelize from '../utils/databaseConnector';
import { IDonor } from './donor';

export interface IDonation {
  id: number;
  date: string;
  amount: number;
  category: string;
  status: string;
  payment: string;
  comment: string;
  donor: IDonor;
}

interface DonationCreationAttributes extends Optional<IDonation, 'id'> {}

interface DonationInstance
  extends Model<IDonation, DonationCreationAttributes>,
    IDonation {
  id: number;
}

const Donation = sequelize.define<DonationInstance>('Donation', {
  id: {
    type: DataType.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  date: { type: DataType.STRING },
  amount: { type: DataType.FLOAT },
  category: { type: DataType.STRING },
  status: { type: DataType.STRING },
  payment: { type: DataType.STRING },
  comment: { type: DataType.STRING },
  donor: { type: DataType.STRING },
});

export default Donation;
