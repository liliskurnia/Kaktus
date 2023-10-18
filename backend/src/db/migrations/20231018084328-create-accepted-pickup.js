'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('accepted_pickups', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      orderId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'master_customer_requests',
          key: 'id',
        },
      },
      driverId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'master_drivers',
          key: 'id',
        },
      },
      points: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
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
    await queryInterface.dropTable('accepted_pickups');
  },
};
