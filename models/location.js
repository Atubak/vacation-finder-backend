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

      location.hasMany(models.comment, {
        foreignKey: "locationId",
      });

      location.hasMany(models.dataPoint, { foreignKey: "locationId" });
    }
  }
  location.init(
    {
      info: DataTypes.STRING,
      lon: DataTypes.FLOAT,
      lat: DataTypes.FLOAT,
      country_code: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "location",
    }
  );
  return location;
};
