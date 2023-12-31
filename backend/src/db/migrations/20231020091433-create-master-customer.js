'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('master_customers', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'users',
          key: 'id',
        },
      },
      uniqueCode: {
        type: Sequelize.STRING(40),
        unique: true,
      },
      nik: {
        type: Sequelize.STRING(20),
        unique: true,
        allowNull: false,
      },
      nama: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },
      email: {
        type: Sequelize.STRING(100),
        unique: true,
        allowNull: false,
      },
      telp: {
        type: Sequelize.STRING(50),
        unique: true,
      },
      alamat: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      kota: {
        type: Sequelize.STRING(50),
        allowNull: false,
      },
      gender: {
        type: Sequelize.STRING(1),
        allowNull: false,
        defaultValue: 'X',
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
    await queryInterface.dropTable('master_customers');
  },
};
