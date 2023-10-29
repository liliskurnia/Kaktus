'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('customer_request_histories', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      requestCode: {
        type: Sequelize.STRING(50),
        unique: true,
        null: false,
      },
      requestType: {
        type: Sequelize.STRING(50),
        null: false,
        defaultValue: 'REQUEST',
      },
      masterCustomerId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'master_customers',
          key: 'id',
        },
      },
      trashCode: {
        type: Sequelize.STRING(50),
        allowNull: false,
      },
      trashType: {
        type: Sequelize.STRING(50),
        allowNull: false,
      },
      status: {
        type: Sequelize.STRING(50),
        allowNull: false,
        defaultValue: 'Requested',
      },
      driverCode: {
        type: Sequelize.STRING(50),
      },
      driverNik: {
        type: Sequelize.STRING(20),
      },
      driverName: {
        type: Sequelize.STRING(100),
      },
      driverPhone: {
        type: Sequelize.STRING(50),
      },
      pickedAt: {
        type: Sequelize.DATE,
      },
      completedAt: {
        type: Sequelize.DATE,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('customer_request_histories');
  },
};
