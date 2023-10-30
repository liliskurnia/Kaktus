'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('accepted_request_histories', {
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
      masterDriverId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'master_drivers',
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
        defaultValue: 'Accepted',
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
    await queryInterface.dropTable('accepted_request_histories');
  },
};
