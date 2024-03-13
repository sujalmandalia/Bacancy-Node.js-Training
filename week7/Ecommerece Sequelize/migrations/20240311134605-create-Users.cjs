'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('users',{
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      user_name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      user_email: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false
      },
      password:{
        type:Sequelize.STRING,
        allowNull:false
      },
      role: {
        type: Sequelize.ENUM,
        values: ['Buyer','Seller']
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false
      }
    }
    );

  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('users');
  }
};
