import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';
dotenv.config();

const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PASS;
const dbName = process.env.DB_NAME;
const dbHost = process.env.DB_HOST;
const dbDialect = process.env.DB_DIALECT;

const sequelize = new Sequelize(dbName, dbUser, dbPassword, {
  host: dbHost,
  dialect: dbDialect,
})

async function connectDB() {
  try {
    await sequelize.authenticate();
    console.log('Conectamos com sucesso com o Sequelize!');
  } catch (err) {
    console.error('Não foi possível conectar: ', err);
  }
}

connectDB()

export default sequelize