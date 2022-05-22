/* eslint-disable import/no-cycle */
/* eslint-disable @typescript-eslint/no-empty-interface */
import { DataType, Model } from 'sequelize-typescript';
import {
  HasManyCreateAssociationMixin,
  HasManyGetAssociationsMixin,
  Optional,
} from 'sequelize/types';
import sequelize from '../utils/databaseConnector';
import Donation, { DonationInstance } from './donation';
import { IUser } from './user';

export interface IDonor {
  donorId: number;
  name: string;
  referral: IUser;
}

interface DonorCreationAttributes extends Optional<IDonor, 'donorId'> {}

export interface DonorInstance
  extends Model<IDonor, DonorCreationAttributes>,
    IDonor {
  id: number;
  name: string;
  createDonation: HasManyCreateAssociationMixin<DonationInstance, 'donationId'>;
  getDonations: HasManyGetAssociationsMixin<DonationInstance>;
}

const Donor = sequelize.define<DonorInstance>('Donor', {
  donorId: {
    type: DataType.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  name: { type: DataType.STRING },
  referral: { type: DataType.STRING },
});
Donor.hasMany(Donation, {
  /*
    You can omit the sourceKey property
    since by default sequelize will use the primary key defined
    in the model - But I like to be explicit
  */
  // sourceKey: 'sdsd',
  // foreignKey: 'donId',
  // as: 'donations',
});

Donation.belongsTo(Donor, {
  /*
      You can omit the sourceKey property
      since by default sequelize will use the primary key defined
      in the model - But I like to be explicit
    */
  // targetKey: 'donorId',
});

export default Donor;
