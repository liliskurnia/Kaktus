'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class customer_request_history extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.master_customer, { foreignKey: 'masterCustomerId' });
    }
  }
  customer_request_history.init(
    {
      requestCode: DataTypes.STRING,
      requestType: DataTypes.STRING,
      masterCustomerId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'master_customers',
          key: 'id',
        },
      },
      trashCode: DataTypes.STRING,
      trashType: DataTypes.STRING,
      status: DataTypes.STRING,
      driverCode: DataTypes.STRING,
      driverNik: DataTypes.STRING,
      driverName: DataTypes.STRING,
      driverPhone: DataTypes.STRING,
      pickedAt: DataTypes.DATE,
      completedAt: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: 'customer_request_history',
    }
  );
  return customer_request_history;
};
