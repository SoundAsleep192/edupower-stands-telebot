'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Stand extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Stand.hasMany(models.User, { foreignKey: 'standId' });
    }
  }
  Stand.init(
    {
      number: DataTypes.INTEGER,
      branch: DataTypes.STRING,
      occupied: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: 'Stand',
    }
  );
  return Stand;
};
