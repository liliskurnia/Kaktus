'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class role_menu extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // this.belongsTo(models.menu, { foreignKey: 'menuId' });
      // this.belongsTo(models.role, { foreignKey: 'roleId' });
    }
  }
  role_menu.init(
    {
      roleId: {
        type: DataTypes.INTEGER,
        references: 'roles',
        key: 'id',
      },
      menuId: {
        type: DataTypes.INTEGER,
        references: {
          model: 'menus',
          key: 'id',
        },
      },
      programName: DataTypes.STRING,
      createdBy: DataTypes.STRING,
      updatedBy: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'role_menu',
    }
  );

  return role_menu;
};
