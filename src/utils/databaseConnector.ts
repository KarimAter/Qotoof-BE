import { PrismaClient } from '@prisma/client';
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

export const prismaClient = new PrismaClient();

export default sequelize;
