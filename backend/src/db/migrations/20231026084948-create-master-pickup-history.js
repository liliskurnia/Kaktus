'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('master_pickup_histories', {
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
      },
      requesterCode: {
        type: Sequelize.STRING(50),
        allowNull: false,
      },
      requesterNik: {
        type: Sequelize.STRING(20),
      },
      requesterName: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },
      requesterPhone: {
        type: Sequelize.STRING(50),
      },
      requesterGender: {
        type: Sequelize.STRING(1),
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
      driverGender: {
        type: Sequelize.STRING(1),
      },
      scheduledDate: {
        type: Sequelize.DATE,
      },
      status: {
        type: Sequelize.STRING(50),
        allowNull: false,
        defaultValue: 'Registered',
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
    await queryInterface.dropTable('master_pickup_histories');
  },
};
