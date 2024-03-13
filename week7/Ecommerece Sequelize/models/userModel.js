import { Sequelize, DataTypes } from "sequelize";
import { sequelize } from "../config/dbConfig.js";

const User = sequelize.define('users', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  user_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  user_email: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false
  },
  password:{
    type:DataTypes.STRING,
    allowNull:false
  },
  role: {
    type: DataTypes.ENUM,
    values: ['Buyer','Seller']
  },
  createdAt: {
    type: DataTypes.DATE,
    allowNull: false
  },
  updatedAt: {
    type: DataTypes.DATE,
    allowNull: false
  }
})

export default User