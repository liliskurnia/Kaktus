'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class master_driver extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.user, { foreignKey: 'userId' });
      // this.hasMany(models.accepted_pickup);
      // this.hasMany(models.scheduled_pickup);
    }
  }
  master_driver.init(
    {
      userId: {
        type: DataTypes.INTEGER,
        references: {
          model: 'users',
          key: 'id',
        },
      },
      uniqueCode: DataTypes.STRING,
      nik: DataTypes.STRING,
      nama: DataTypes.STRING,
      email: DataTypes.STRING,
      telp: DataTypes.STRING,
      alamat: DataTypes.TEXT,
      kota: DataTypes.STRING,
      gender: DataTypes.STRING,
      latitude: DataTypes.DECIMAL,
      longitude: DataTypes.DECIMAL,
      programName: DataTypes.STRING,
      createdBy: DataTypes.STRING,
      updatedBy: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'master_driver',
    }
  );
  master_driver.beforeDestroy(async (driver, options) => {
    const driverId = driver.id;
    try {
      const accepts = await sequelize.models.accepted_pickup.findAll({
        where: { driverId },
      });
      for (const accept of accepts) {
        await accept.destroy(options);
      }

      const assigns = await sequelize.models.scheduled_pickup.findAll({
        where: { driverId },
      });
      for (const assign of assigns) {
        await assign.destroy(options);
      }
    } catch (error) {
      console.error('gagal menghapus data terasosiasi dengan driver');
    }
  });
  return master_driver;
};
