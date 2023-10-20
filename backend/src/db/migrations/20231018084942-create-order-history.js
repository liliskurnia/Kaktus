'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('order_histories', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      orderId: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      nikCustomer: {
        type: Sequelize.STRING(20),
        allowNull: false,
      },
      namaCustomer: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },
      alamatCustomer: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      telpCustomer: {
        type: Sequelize.STRING(50),
        allowNull: false,
      },
      nikDriver: {
        type: Sequelize.STRING(20),
      },
      namaDriver: {
        type: Sequelize.STRING(100),
      },
      alamatDriver: {
        type: Sequelize.TEXT,
      },
      telpDriver: {
        type: Sequelize.STRING(50),
      },
      points: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      barcodeSampah: {
        type: Sequelize.STRING(50),
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
      namaTps: {
        type: Sequelize.STRING(100),
      },
      latitude: {
        type: Sequelize.DECIMAL(8, 6),
      },
      longitude: {
        type: Sequelize.DECIMAL(9, 6),
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
    await queryInterface.dropTable('order_histories');
  },
};
