'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('sampah_masters', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      masterCustomerId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'master_customers',
          key: 'id',
        },
      },
      jenisSampahId: {
        type: Sequelize.INTEGER,
        allowNull: 'false',
        references: {
          model: 'jenis_sampahs',
          key: 'id',
        },
      },
      jenisSampah: {
        type: Sequelize.STRING(50),
        allowNull: false,
        defaultValue: 'U-Undefined',
      },
      barcode: {
        type: Sequelize.STRING(50),
        unique: true,
        allowNull: false,
      },
      status: {
        type: Sequelize.STRING(50),
        allowNull: false,
        defaultValue: 'Inactive',
      },
      latitude: {
        type: Sequelize.DECIMAL(8, 6),
      },
      longitude: {
        type: Sequelize.DECIMAL(9, 6),
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
    await queryInterface.dropTable('sampah_masters');
  },
};
