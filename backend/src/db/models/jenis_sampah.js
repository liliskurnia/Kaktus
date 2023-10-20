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
      // this.hasMany(models.sampah);
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
        await sampah.destroy(options);
      }
    }
  });
  return jenis_sampah;
};
