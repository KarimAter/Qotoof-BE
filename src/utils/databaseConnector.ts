import mysql from 'mysql2';
import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('Qutoof', 'root', 'admin', {
  dialect: 'mysql',
  host: 'localhost',
});

// const pool = mysql.createPool({
//   host: 'localhost',
//   user: 'root',
//   database: 'Qutoof',
//   password: 'admin',
// });

export default sequelize;
