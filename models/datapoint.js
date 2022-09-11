"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class dataPoint extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      dataPoint.belongsTo(models.location, { foreignKey: "locationId" });
    }
  }
  dataPoint.init(
    {
      lon: DataTypes.FLOAT,
      lat: DataTypes.FLOAT,
      name: DataTypes.STRING,
      wikiId: DataTypes.STRING,
      cat: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "dataPoint",
    }
  );
  return dataPoint;
};
