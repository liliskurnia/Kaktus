'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class menu extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.role_menu);
    }
  }
  menu.init(
    {
      nama: DataTypes.STRING,
      icon: DataTypes.STRING,
      url: DataTypes.STRING,
      programName: DataTypes.STRING,
      createdBy: DataTypes.STRING,
      updatedBy: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'menu',
    }
  );
  menu.beforeDestroy(async (menu, options) => {
    const menuId = menu.id;
    try {
      await sequelize.models.role_menu.destroy({
        where: { menuId },
        ...options,
      });
    } catch (error) {
      console.error('gagal menghapus role menu terasosiasi dengan menu');
    }
  });
  return menu;
};
