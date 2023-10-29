'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class accepted_request_history extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.master_driver, { foreignKey: 'masterDriverId' });
    }
  }
  accepted_request_history.init(
    {
      requestCode: DataTypes.STRING,
      requestType: DataTypes.STRING,
      masterDriverId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'master_drivers',
          key: 'id',
        },
      },
      trashCode: DataTypes.STRING,
      trashType: DataTypes.STRING,
      status: DataTypes.STRING,
      customerCode: DataTypes.STRING,
      customerNik: DataTypes.STRING,
      customerName: DataTypes.STRING,
      customerPhone: DataTypes.STRING,
      pickedAt: DataTypes.STRING,
      completedAt: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'accepted_request_history',
    }
  );
  return accepted_request_history;
};
