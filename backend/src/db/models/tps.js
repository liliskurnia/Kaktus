'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class tps extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // this.hasMany(models.master_operator);
    }
  }
  tps.init(
    {
      nama: DataTypes.STRING,
      barcode: DataTypes.STRING,
      status: DataTypes.STRING,
      latitude: DataTypes.DECIMAL,
      longitude: DataTypes.DECIMAL,
      programName: DataTypes.STRING,
      createdBy: DataTypes.STRING,
      updatedBy: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'tps',
    }
  );
  tps.beforeDestroy(async (tps, options) => {
    const tpsId = tps.id;
    try {
      const operators = await sequelize.models.master_operator.findAll({
        where: { tpsId },
      });
      for (const operator of operators) {
        await operator.update({ tpsId: null });
      }
    } catch (error) {
      console.error('gagal menghapus ID TPS');
    }
  });
  return tps;
};
