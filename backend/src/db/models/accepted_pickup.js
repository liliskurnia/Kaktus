'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class accepted_pickup extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  accepted_pickup.init({
    orderId: DataTypes.INTEGER,
    driverId: DataTypes.INTEGER,
    points: DataTypes.INTEGER,
    programName: DataTypes.STRING,
    createdBy: DataTypes.STRING,
    updatedBy: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'accepted_pickup',
  });
  return accepted_pickup;
};