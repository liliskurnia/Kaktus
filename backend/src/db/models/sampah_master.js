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
      this.belongsTo(models.jenis_sampah, { foreignKey: 'jenisSampahId' });
    }
  }
  sampah_master.init(
    {
      ownerCode: DataTypes.STRING,
      jenisSampahId: DataTypes.INTEGER,
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
