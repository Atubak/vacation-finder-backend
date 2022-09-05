"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class datapoint extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      datapoint.belongsTo(models.location, { foreignKey: "locationId" });
    }
  }
  datapoint.init(
    {
      xCoordinate: DataTypes.FLOAT,
      yCoordinate: DataTypes.FLOAT,
      name: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "datapoint",
    }
  );
  return datapoint;
};
