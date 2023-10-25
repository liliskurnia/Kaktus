'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class master_operator extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.user, { foreignKey: 'userId' });
      this.belongsTo(models.tps, { foreignKey: 'tpId' });
    }
  }
  master_operator.init(
    {
      userId: {
        type: DataTypes.INTEGER,
        references: {
          model: 'users',
          key: 'id',
        },
      },
      tpId: {
        type: DataTypes.INTEGER,
        references: {
          model: 'tps',
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
      programName: DataTypes.STRING,
      createdBy: DataTypes.STRING,
      updatedBy: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'master_operator',
    }
  );
  return master_operator;
};
