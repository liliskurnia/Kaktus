'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class scheduled_pickup extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  scheduled_pickup.init({
    requestCode: DataTypes.STRING,
    requestType: DataTypes.STRING,
    tpsCode: DataTypes.STRING,
    tpsName: DataTypes.STRING,
    operatorCode: DataTypes.STRING,
    operatorName: DataTypes.STRING,
    driverCode: DataTypes.STRING,
    driverName: DataTypes.STRING,
    trashCode: DataTypes.STRING,
    trashType: DataTypes.STRING,
    status: DataTypes.STRING,
    pickedAt: DataTypes.DATE,
    completedAt: DataTypes.DATE,
    programName: DataTypes.STRING,
    createdBy: DataTypes.STRING,
    updatedBy: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'scheduled_pickup',
  });
  return scheduled_pickup;
};