'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class master_request extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  master_request.init({
    requestCode: DataTypes.STRING,
    requestType: DataTypes.STRING,
    customerCode: DataTypes.STRING,
    customerNik: DataTypes.STRING,
    customerName: DataTypes.STRING,
    customerPhone: DataTypes.STRING,
    trashCode: DataTypes.STRING,
    trashType: DataTypes.STRING,
    status: DataTypes.STRING,
    driverCode: DataTypes.STRING,
    driverNik: DataTypes.STRING,
    driverName: DataTypes.STRING,
    driverPhone: DataTypes.STRING,
    pickedAt: DataTypes.DATE,
    completedAt: DataTypes.DATE,
    programName: DataTypes.STRING,
    createdBy: DataTypes.STRING,
    updatedBy: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'master_request',
  });
  return master_request;
};