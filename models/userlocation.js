"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class userLocation extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      userLocation.belongsTo(models.user, { foreignKey: "userId" });
      userLocation.belongsTo(models.location, { foreignKey: "locationId" });
    }
  }
  userLocation.init(
    {
      userId: DataTypes.INTEGER,
      locationId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "userLocation",
    }
  );
  return userLocation;
};
