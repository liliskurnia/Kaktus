'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class master_customer_request extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.master_customer, { foreignKey: 'customerId' });
      this.belongsTo(models.master_driver, { foreignKey: 'driverId' });
      this.hasOne(models.scheduled_pickup);
      this.hasOne(models.accepted_pickup);
      this.hasOne(models.order_history, { foreignKey: 'historyId' });
      this.hasOne(models.jenis_sampah, { foreignKey: 'jenisSampah' });
    }
  }
  master_customer_request.init(
    {
      historyId: {
        type: DataTypes.INTEGER,
        references: {
          model: 'order_histories',
          key: 'id',
        },
      },
      customerId: {
        type: DataTypes.INTEGER,
        references: {
          model: 'master_customers',
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
      barcodeSampah: DataTypes.STRING,
      jenisSampah: {
        type: DataTypes.INTEGER,
        references: {
          model: 'jenis_sampahs',
          key: 'kode',
        },
      },
      status: DataTypes.STRING,
      points: DataTypes.INTEGER,
      latitude: DataTypes.DECIMAL,
      longitude: DataTypes.DECIMAL,
      orderedFor: DataTypes.DATE,
      pickedUpAt: DataTypes.DATE,
      completedAt: DataTypes.DATE,
      programName: DataTypes.STRING,
      createdBy: DataTypes.STRING,
      updatedBy: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'master_customer_request',
    }
  );
  master_customer_request.beforeDestroy(async (order, options) => {
    const orderId = order.id;
    try {
      const assigned = await sequelize.models.scheduled_pickup.findOne({
        where: { orderId },
      });
      if (assigned) {
        await assigned.destroy({
          where: { orderId },
          ...options,
        });
      }

      const accepted = await sequelize.models.accepted_pickup.findOne({
        where: { orderId },
      });
      if (accepted) {
        await accepted.destroy({
          where: { orderId },
          ...options,
        });
      }
    } catch (error) {
      console.error('error menghapus data terasosiasi dengan order pelanggan');
    }
  });
  return master_customer_request;
};
