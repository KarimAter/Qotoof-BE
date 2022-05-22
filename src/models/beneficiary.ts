import sequelize from '../utils/databaseConnector';

export interface IBeneficiary {
  id: number;
  beneficiaryName: string;
}

export default IBeneficiary;
