"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class location extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      location.belongsToMany(models.user, {
        through: "userLocations",
        foreignKey: "locationId",
      });
    }
  }
  location.init(
    {
      closestTown: DataTypes.STRING,
      region: DataTypes.STRING,
      country: DataTypes.STRING,
      xCoordinate: DataTypes.FLOAT,
      yCoordinate: DataTypes.FLOAT,
    },
    {
      sequelize,
      modelName: "location",
    }
  );
  return location;
};
