'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('sampahs', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      jenis: {
        type: Sequelize.STRING(20),
        allowNull: false,
        defaultValue: 'Unassigned',
      },
      barcode: {
        type: Sequelize.STRING(50),
        allowNull: false,
        unique: true,
      },
      status: {
        type: Sequelize.STRING(50),
        allowNull: false,
        defaultValue: 'Not Active',
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
    await queryInterface.dropTable('sampahs');
  },
};
