'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      username: {
        type: Sequelize.STRING(255),
        unique: true,
      },
      password: {
        type: Sequelize.STRING(100),
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
      },
      alamat: {
        type: Sequelize.TEXT,
      },
      kota: {
        type: Sequelize.STRING(50),
      },
      gender: {
        type: Sequelize.STRING(1),
        defaultValue: 'X',
      },
      points: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      programName: {
        type: Sequelize.STRING,
        defaultValue: 'Postman',
      },
      createdBy: {
        type: Sequelize.STRING,
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
    await queryInterface.dropTable('users');
  },
};
