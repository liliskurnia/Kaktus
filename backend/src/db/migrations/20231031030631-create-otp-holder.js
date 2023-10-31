'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('otp_holders', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      username: {
        type: Sequelize.STRING(255),
      },
      password: {
        type: Sequelize.STRING(100),
      },
      nik: {
        type: Sequelize.STRING(20),
      },
      nama: {
        type: Sequelize.STRING(100),
      },
      email: {
        type: Sequelize.STRING(100),
      },
      telp: {
        type: Sequelize.STRING(50),
      },
      alamat: {
        type: Sequelize.TEXT,
      },
      kota: {
        type: Sequelize.STRING(100),
      },
      gender: {
        type: Sequelize.STRING(1),
      },
      otp: {
        type: Sequelize.STRING(6),
        unique: true,
        allowNull: false,
      },
      expiredAt: {
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
    await queryInterface.dropTable('otp_holders');
  },
};
