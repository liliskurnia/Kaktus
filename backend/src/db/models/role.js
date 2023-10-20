'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class role extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // this.hasMany(models.hak_akses);
      // this.hasMany(models.role_menu);
    }
  }
  role.init(
    {
      nama: DataTypes.STRING,
      programName: DataTypes.STRING,
      createdBy: DataTypes.STRING,
      updatedBy: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'role',
    }
  );
  role.beforeDestroy(async (role, options) => {
    const roleId = role.id;
    try {
      await sequelize.models.hak_akses.destroy({
        where: { roleId },
        ...options,
      });
      await sequelize.models.role_menu.destroy({
        where: { roleId },
        ...options,
      });
    } catch (error) {
      console.error('error menghapus data terasosiasi dengan role');
    }
  });
  return role;
};
