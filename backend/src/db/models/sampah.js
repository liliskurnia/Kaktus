'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class sampah extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.master_customer, { foreignKey: 'customerId' });
      this.belongsTo(models.jenis_sampah, { foreignKey: 'jenis' });
    }
  }
  sampah.init(
    {
      customerId: {
        type: DataTypes.STRING,
        references: {
          model: 'master_customers',
          key: 'id',
        },
      },
      jenisSampah: {
        type: DataTypes.INTEGER,
        references: {
          model: 'jenis_sampahs',
          key: 'id',
        },
      },
      barcode: DataTypes.STRING,
      status: DataTypes.STRING,
      latitude: DataTypes.DECIMAL,
      longitude: DataTypes.DECIMAL,
      programName: DataTypes.STRING,
      createdBy: DataTypes.STRING,
      updatedBy: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'sampah',
    }
  );
  return sampah;
};
