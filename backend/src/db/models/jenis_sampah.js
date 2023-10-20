'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class jenis_sampah extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.sampah);
      this.hasMany(models.master_customer_request);
    }
  }
  jenis_sampah.init(
    {
      kode: DataTypes.STRING,
      nama: DataTypes.STRING,
      programName: DataTypes.STRING,
      createdBy: DataTypes.STRING,
      updatedBy: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'jenis_sampah',
    }
  );
  jenis_sampah.beforeDestroy(async (jenis, options) => {
    const jenisSampah = jenis.id;

    //unlink jenis sampah from sampah models
    const linkedSampahs = await sequelize.models.sampah.findAll({
      where: { jenisSampah },
    });
    if (linkedSampahs) {
      for (const sampah of linkedSampahs) {
        await sampah.update({
          jenisId: null,
        });
      }

      //unlink jenis sampah from master customer requests
      const linkedOrders = await sequelize.models.sampah.findAll({
        where: { jenisSampah },
      });
      if (linkedOrders) {
        for (const order of linkedOrders) {
          await order.update({
            jenisSampah: null,
          });
        }
      }
    }
  });
  return jenis_sampah;
};
