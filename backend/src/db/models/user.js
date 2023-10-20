'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class user extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // this.hasMany(models.hak_akses);
      // this.hasOne(models.master_operator);
      // this.hasOne(models.master_customer);
      // this.hasOne(models.master_driver);
    }
  }
  user.init(
    {
      username: DataTypes.STRING,
      password: DataTypes.STRING,
      nik: DataTypes.STRING,
      nama: DataTypes.STRING,
      email: DataTypes.STRING,
      telp: DataTypes.STRING,
      alamat: DataTypes.TEXT,
      kota: DataTypes.STRING,
      gender: DataTypes.STRING,
      points: DataTypes.STRING,
      programName: DataTypes.STRING,
      createdBy: DataTypes.STRING,
      updatedBy: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'user',
    }
  );
  user.beforeDestroy(async (user, options) => {
    const userId = user.id;
    try {
      //tunggu hal akses dihapus dari db
      await sequelize.models.hak_akses.destroy({
        where: { userId },
        ...options,
      });

      //hapus data sebagai operator jika ada
      const operator = await sequelize.models.master_operator.findOne({
        where: { userId },
      });
      if (operator) {
        await operator.destroy({
          where: { userId },
          ...options,
        });
      }

      //hapus data sebagai driver jika ada
      const driver = await sequelize.models.master_driver.findOne({
        where: { userId },
      });
      if (driver) {
        await driver.destroy({
          where: { userId },
          ...options,
        });
      }

      //hapus data sebagai customer jika ada
      const customer = await sequelize.models.master_customer.findOne({
        where: { userId },
      });
      if (customer) {
        await customer.destroy({
          where: { userId },
          ...options,
        });
      }
    } catch (error) {
      console.error('gagal menghapus data-data terasosiasi dengan user');
    }
  });
  return user;
};
