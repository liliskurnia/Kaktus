'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class master_pickup_history extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  master_pickup_history.init({
    requestCode: DataTypes.STRING,
    requestType: DataTypes.STRING,
    requesterCode: DataTypes.STRING,
    requesterNik: DataTypes.STRING,
    requesterName: DataTypes.STRING,
    requesterPhone: DataTypes.STRING,
    requesterGender: DataTypes.STRING,
    trashCode: DataTypes.STRING,
    trashType: DataTypes.STRING,
    driverCode: DataTypes.STRING,
    driverNik: DataTypes.STRING,
    driverName: DataTypes.STRING,
    driverPhone: DataTypes.STRING,
    driverGender: DataTypes.STRING,
    status: DataTypes.STRING,
    pickedAt: DataTypes.DATE,
    completedAt: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'master_pickup_history',
  });
  return master_pickup_history;
};