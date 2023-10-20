'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class accepted_pickup extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.master_customer_request, { foreignKey: 'orderId' });
      this.belongsTo(models.master_driver, { foreignKey: 'driverId' });
    }
  }
  accepted_pickup.init(
    {
      historyId: {
        type: DataTypes.INTEGER,
        references: {
          model: 'pickup_histories',
          key: 'id',
        },
      },
      orderId: {
        type: DataTypes.INTEGER,
        references: {
          model: 'master_customer_requests',
          key: 'id',
        },
      },
      driverId: {
        type: DataTypes.INTEGER,
        references: {
          model: 'master_drivers',
          key: 'id',
        },
      },
      points: DataTypes.INTEGER,
      programName: DataTypes.STRING,
      createdBy: DataTypes.STRING,
      updatedBy: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'accepted_pickup',
    }
  );
  return accepted_pickup;
};
