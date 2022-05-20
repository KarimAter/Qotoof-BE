/* eslint-disable @typescript-eslint/no-empty-interface */
import { Sequelize, DataType, Model } from 'sequelize-typescript';
import { DataTypes, Optional } from 'sequelize/types';
import sequelize from '../utils/databaseConnector';

export interface IBeneficiary {
  id: number;
  beneficiaryName: string;
}

interface BenCreationAttributes extends Optional<IBeneficiary, 'id'> {}

interface BenInstance
  extends Model<IBeneficiary, BenCreationAttributes>,
    IBeneficiary {
  id: number;
}

const Beneficiary = sequelize.define<BenInstance>('Beneficiary', {
  id: {
    type: DataType.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  beneficiaryName: { type: DataType.STRING },
});

export default Beneficiary;
