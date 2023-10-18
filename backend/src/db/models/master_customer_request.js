'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class master_customer_request extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  master_customer_request.init({
    customerId: DataTypes.INTEGER,
    driverId: DataTypes.INTEGER,
    barcodeSampah: DataTypes.STRING,
    jenisSampah: DataTypes.STRING,
    status: DataTypes.STRING,
    points: DataTypes.INTEGER,
    latitude: DataTypes.DECIMAL,
    longitude: DataTypes.DECIMAL,
    orderedFor: DataTypes.DATE,
    pickedUpAt: DataTypes.DATE,
    completedAt: DataTypes.DATE,
    programName: DataTypes.STRING,
    createdBy: DataTypes.STRING,
    updatedBy: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'master_customer_request',
  });
  return master_customer_request;
};