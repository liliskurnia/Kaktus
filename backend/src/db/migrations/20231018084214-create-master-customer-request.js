'use strict';

const master_customer = require('../models/master_customer');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('master_customer_requests', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      customerId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'master_customers',
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
      barcodeSampah: {
        type: Sequelize.STRING(20),
        unique: true,
        allowNull: false,
      },
      jenisSampah: {
        type: Sequelize.STRING(20),
        allowNull: false,
        defaultValue: 'Unassigned',
      },
      status: {
        type: Sequelize.STRING(50),
        allowNull: false,
        defaultValue: 'Requested',
      },
      points: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      latitude: {
        type: Sequelize.DECIMAL(8, 6),
        allowNull: false,
      },
      longitude: {
        type: Sequelize.DECIMAL(9, 6),
        allowNull: false,
      },
      orderedFor: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      pickedUpAt: {
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
    await queryInterface.dropTable('master_customer_requests');
  },
};
