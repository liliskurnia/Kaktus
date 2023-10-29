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
      this.hasMany(models.customer_request_history);
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
      uniqueCode: DataTypes.STRING,
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
    const masterCustomerId = customer.id;
    try {
      const sampahs = await sequelize.models.sampah_master.findAll({
        where: {
          masterCustomerId,
        },
      });
      console.log(sampahs);
      for (const sampah of sampahs) {
        await fs.rm(`./public/qrcodes/images/${sampah.barcode}.png`, function (error) {
          if (error) throw error;
        });
        await fs.rm(`./public/qrcodes/svgs/${sampah.barcode}.svg`, function (error) {
          if (error) throw error;
        });
        await fs.rm(`./public/qrcodes/pdfs/${sampah.barcode}.pdf`, function (error) {
          if (error) throw error;
        });
        await sampah.destroy();
      }
    } catch (error) {
      console.error('gagal menghapus data customer', error);
    }
  });
  return master_customer;
};
