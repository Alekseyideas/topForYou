import { Sequelize } from 'sequelize-typescript';
import path from 'path';
const { DB_NAME, DB_USER, DB_PASS, DB_HOST } = process.env;

const reqPath = path.join(__dirname, '../');
const sequelize = new Sequelize(DB_NAME!, DB_USER!, DB_PASS, {
  dialect: 'postgres',
  host: DB_HOST,
  port: 5432,
  models: [reqPath + '/models'],
});

export = sequelize;
