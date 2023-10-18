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
    orderId: DataTypes.INTEGER,
    driverId: DataTypes.INTEGER,
    assigneeId: DataTypes.INTEGER,
    points: DataTypes.INTEGER,
    programName: DataTypes.STRING,
    createdBy: DataTypes.STRING,
    updatedBy: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'scheduled_pickup',
  });
  return scheduled_pickup;
};