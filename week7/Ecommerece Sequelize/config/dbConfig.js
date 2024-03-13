import { Sequelize } from "sequelize";

export const sequelize = new Sequelize('ecommerce', 'postgres', 'Sujal@2002', {
  host: 'localhost',
  dialect: 'postgres',
  logging: console.log
});

export const connect = async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}

