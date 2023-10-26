'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('scheduled_pickups', {
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
        defaultValue: 'SCHEDULED',
      },
      tpsCode: {
        type: Sequelize.STRING(50),
        allowNull: false,
      },
      tpsName: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },
      operatorCode: {
        type: Sequelize.STRING(50),
        allowNull: false,
      },
      operatorName: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },
      driverCode: {
        type: Sequelize.STRING(50),
      },
      driverName: {
        type: Sequelize.STRING(100),
      },
      trashCode: {
        type: Sequelize.STRING(50),
        unique: true,
        allowNull: false,
      },
      trashType: {
        type: Sequelize.STRING(50),
        allowNull: false,
      },
      status: {
        type: Sequelize.STRING(50),
        allowNull: false,
        defaultValue: 'Scheduled',
      },
      pickedAt: {
        type: Sequelize.DATE,
      },
      completedAt: {
        type: Sequelize.DATE,
      },
      programName: {
        type: Sequelize.STRING(100),
        defaultValue: 'Postman',
      },
      createdBy: {
        type: Sequelize.STRING(100),
        defaultValue: 'Admin',
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
    await queryInterface.dropTable('scheduled_pickups');
  },
};
