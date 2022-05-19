/* eslint-disable @typescript-eslint/no-empty-interface */
import { Sequelize, DataType, Model } from 'sequelize-typescript';
import { DataTypes, Optional } from 'sequelize/types';
import sequelize from '../utils/databaseConnector';

export interface IBeneficiary {
  id: number;
  beneficiaryName: string;
}

const beneficiaryList: IBeneficiary[] = [];

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

// class Beneficiary implements IBeneficiary {
//   name: string;

//   constructor(name: string) {
//     this.name = name;
//   }

//   save() {
//     return db.execute(`INSERT INTO Beneficiaries (id,name) values (?,?)`, [
//       1000 * Math.random(),
//       this.name,
//     ]);
//   }

//   static editBeneficiary(currentName: string, targetName: string): string {
//     const index: number = beneficiaryList.findIndex(
//       (ben) => ben.name === currentName,
//     );
//     if (index !== -1) {
//       beneficiaryList[index] = new Beneficiary(targetName);
//       return 'Name edited to ';
//     }
//     return 'Not found';
//   }

//   static deleteBeneficiary(name: string): string {
//     const index: number = beneficiaryList.findIndex((ben) => ben.name === name);

//     if (index !== -1) {
//       beneficiaryList.splice(index, 1);
//       return 'Deleted!';
//     }
//     return 'Not found';
//   }

//   static fetchCases() {
//     // let beneficiaryList:IBeneficiary;
//     return db.execute('Select * from Beneficiaries;');
//   }
// }
