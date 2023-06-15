import sequelize from '../utils/databaseConnector';

export interface IBeneficiary {
  id: number;
  name: string;
}

export default IBeneficiary;
