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
        as: "followingUser",
        foreignKey: "followee",
      });
      userFollowingUser.belongsTo(models.user, {
        as: "followedUser",
        foreignKey: "follower",
      });
    }
  }
  userFollowingUser.init(
    {
      followee: DataTypes.INTEGER,
      follower: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "userFollowingUser",
    }
  );
  return userFollowingUser;
};

//HAVE TO SWITCH FOLLOWEE AND FOLLOWER
