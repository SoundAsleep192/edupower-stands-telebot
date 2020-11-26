'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      User.belongsTo(models.Stand, {
        foreignKey: 'standId',
        onDelete: 'CASCADE',
      });
    }
  }
  User.init(
    {
      telegram_id: DataTypes.STRING,
      username: DataTypes.STRING,
      real_name: DataTypes.STRING,
      standId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'User',
    }
  );
  return User;
};
