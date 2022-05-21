import mysql from 'mysql2';
import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('Qutoof', 'root', 'admin', {
  dialect: 'mysql',
  host: 'localhost',
  dialectOptions: {
    useUTC: false, // for reading from database
  },
  timezone: '+02:00', // for writing to database
});

// const pool = mysql.createPool({
//   host: 'localhost',
//   user: 'root',
//   database: 'Qutoof',
//   password: 'admin',
// });

export default sequelize;
