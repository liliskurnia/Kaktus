'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class sampah extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  sampah.init(
    {
      jenis: DataTypes.STRING,
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
      modelName: 'sampah',
    }
  );
  return sampah;
};
