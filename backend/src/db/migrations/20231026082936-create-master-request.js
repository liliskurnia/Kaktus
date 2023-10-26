'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('master_requests', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      requestCode: {
        type: Sequelize.STRING(50),
        unique: true,
        allowNull: false,
      },
      requestType: {
        type: Sequelize.STRING(50),
        allowNull: false,
        defaultValue: 'REQUEST',
      },
      customerCode: {
        type: Sequelize.STRING(50),
        allowNull: false,
      },
      customerNik: {
        type: Sequelize.STRING(20),
        allowNull: false,
      },
      customerName: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },
      customerPhone: {
        type: Sequelize.STRING(50),
        allowNull: false,
      },
      trashCode: {
        type: Sequelize.STRING(50),
        allowNull: false,
        unique: true,
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
      programName: {
        type: Sequelize.STRING(100),
        defaultValue: 'System',
      },
      createdBy: {
        type: Sequelize.STRING(100),
        defaultValue: 'System',
      },
      updatedBy: {
        type: Sequelize.STRING(100),
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
    await queryInterface.dropTable('master_requests');
  },
};
