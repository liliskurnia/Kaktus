'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class master_customer extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.user, { foreignKey: 'userId' });
      this.hasMany(models.master_customer_request);
    }
  }
  master_customer.init(
    {
      userId: {
        type: DataTypes.INTEGER,
        references: {
          model: 'users',
          key: 'id',
        },
      },
      nik: DataTypes.STRING,
      nama: DataTypes.STRING,
      email: DataTypes.STRING,
      telp: DataTypes.STRING,
      alamat: DataTypes.TEXT,
      kota: DataTypes.STRING,
      gender: DataTypes.STRING,
      latitude: DataTypes.DECIMAL,
      longitude: DataTypes.DECIMAL,
      programName: DataTypes.STRING,
      createdBy: DataTypes.STRING,
      updatedBy: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'master_customer',
    }
  );
  master_customer.beforeDestroy(async (customer, options) => {
    const customerId = customer.id;
    try {
      const orders = await sequelize.models.master_customer_request.findAll({
        where: { customerId },
      });
      for (const order of orders) {
        await order.destroy(options);
      }
    } catch (error) {
      console.error('error menghapus data orderan pelanggan');
    }
  });
  return master_customer;
};
