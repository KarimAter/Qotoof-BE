/* eslint-disable import/no-cycle */
/* eslint-disable @typescript-eslint/no-empty-interface */
import { DataType, Model } from 'sequelize-typescript';
import { BelongsToGetAssociationMixin, Optional } from 'sequelize/types';
import sequelize from '../utils/databaseConnector';
import Donor, { DonorInstance, IDonor } from './donor';

export interface IDonation {
  donationId: number;
  date: string;
  amount: number;
  category: string;
  status: string;
  payment: string;
  comment: string;
  donor: string;
}

interface DonationCreationAttributes
  extends Optional<IDonation, 'donationId'> {}

export interface DonationInstance
  extends Model<IDonation, DonationCreationAttributes>,
    IDonation {
  id: number;
  donor: string;
  getDonor: BelongsToGetAssociationMixin<DonorInstance>;
}

const Donation = sequelize.define<DonationInstance>('Donation', {
  donationId: {
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
