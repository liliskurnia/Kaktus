'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class order_history extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  order_history.init(
    {
      orderId: DataTypes.INTEGER,
      kodeCustomer: DataTypes.STRING,
      nikCustomer: DataTypes.STRING,
      namaCustomer: DataTypes.STRING,
      alamatCustomer: DataTypes.TEXT,
      telpCustomer: DataTypes.STRING,
      nikDriver: DataTypes.STRING,
      namaDriver: DataTypes.STRING,
      alamatDriver: DataTypes.TEXT,
      telpDriver: DataTypes.STRING,
      points: DataTypes.INTEGER,
      barcodeSampah: DataTypes.STRING,
      jenisSampah: DataTypes.STRING,
      status: DataTypes.STRING,
      namaTps: DataTypes.STRING,
      latitude: DataTypes.DECIMAL,
      longitude: DataTypes.DECIMAL,
      orderedFor: DataTypes.DATE,
      pickedUpAt: DataTypes.DATE,
      completedAt: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: 'order_history',
    }
  );
  return order_history;
};
