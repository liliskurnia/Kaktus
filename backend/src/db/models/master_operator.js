'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class master_operator extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  master_operator.init({
    userId: DataTypes.INTEGER,
    tpsId: DataTypes.INTEGER,
    nik: DataTypes.STRING,
    nama: DataTypes.STRING,
    email: DataTypes.STRING,
    telp: DataTypes.STRING,
    alamat: DataTypes.TEXT,
    programName: DataTypes.STRING,
    createdBy: DataTypes.STRING,
    updatedBy: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'master_operator',
  });
  return master_operator;
};