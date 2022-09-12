"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class userFollowingUser extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      userFollowingUser.belongsTo(models.user, {
        as: "followedUser",
        foreignKey: "followed",
      });
      userFollowingUser.belongsTo(models.user, {
        as: "followingUser",
        foreignKey: "following",
      });
    }
  }
  userFollowingUser.init(
    {
      followed: DataTypes.INTEGER,
      following: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "userFollowingUser",
    }
  );
  return userFollowingUser;
};
