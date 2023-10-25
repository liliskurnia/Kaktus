'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('master_drivers', {
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
      tpId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'tps',
          key: 'id',
        },
        defaultValue: 1,
      },
      uniqueCode: {
        type: Sequelize.STRING(50),
        unique: true,
        allowNull: false,
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
      },
      telp: {
        type: Sequelize.STRING(50),
        unique: true,
        allowNull: false,
      },
      alamat: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      kota: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },
      gender: {
        type: Sequelize.STRING(1),
        allowNull: false,
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
        type: Sequelize.STRING,
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
    await queryInterface.dropTable('master_drivers');
  },
};
