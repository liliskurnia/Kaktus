'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class sampah_master extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.master_customer, { foreignKey: 'masterCustomerId' });
      this.belongsTo(models.jenis_sampah, { foreignKey: 'jenisSampahId' });
    }
  }
  sampah_master.init(
    {
      masterCustomerId: {
        type: DataTypes.INTEGER,
        references: {
          model: 'master_customers',
          key: 'id',
        },
      },
      jenisSampahId: {
        type: DataTypes.INTEGER,
        references: {
          model: 'jenis_sampahs',
          key: 'id',
        },
      },
      jenisSampah: DataTypes.STRING,
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
      modelName: 'sampah_master',
    }
  );
  return sampah_master;
};
