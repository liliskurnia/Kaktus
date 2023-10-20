'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class hak_akses extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.role, { foreignKey: 'roleId' });
      this.belongsTo(models.user, { foreignKey: 'userId' });
    }
  }
  hak_akses.init(
    {
      userId: {
        type: DataTypes.INTEGER,
        references: {
          model: 'users',
          key: 'id',
        },
      },
      roleId: {
        type: DataTypes.INTEGER,
        references: {
          model: 'roles',
          key: 'id',
        },
      },
      programName: DataTypes.STRING,
      createdBy: DataTypes.STRING,
      updatedBy: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'hak_akses',
    }
  );
  return hak_akses;
};
