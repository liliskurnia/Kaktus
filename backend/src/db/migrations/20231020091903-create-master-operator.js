'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('master_operators', {
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
      tpsId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'tps',
          key: 'id',
        },
      },
      uniqueCode: {
        type: Sequelize.STRING(40),
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
        unique: true,
        allowNull: false,
      },
      email: {
        type: Sequelize.STRING(100),
        unique: true,
      },
      telp: {
        type: Sequelize.STRING(50),
        unique: true,
      },
      alamat: {
        type: Sequelize.TEXT,
      },
      gender: {
        type: Sequelize.STRING(1),
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
    await queryInterface.dropTable('master_operators');
  },
};
