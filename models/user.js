"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class user extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      user.belongsToMany(models.location, {
        through: "userLocations",
        foreignKey: "userId",
      });

      user.hasMany(models.comment, {
        foreignKey: "userId",
      });
    }
  }
  user.init(
    {
      name: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      imgUrl: {
        type: DataTypes.STRING,
        defaultValue:
          "https://i.pinimg.com/originals/6a/7b/0b/6a7b0b15659ff7b51efa21ab9d5f49da.jpg",
      },
    },
    {
      sequelize,
      modelName: "user",
    }
  );
  return user;
};
