"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Blog extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // Blog.belongsTo(models.Category, {
      //   foreignKey: "category",
      //   targetKey: "code",
      //   as:''
      // });
      Blog.belongsTo(models.User, {
        foreignKey: "userId",
        targetKey: "id",
        as: "user",
      });
    }
  }
  Blog.init(
    {
      title: DataTypes.STRING,

      description: DataTypes.TEXT,

      images: DataTypes.TEXT,
    },
    {
      sequelize,
      modelName: "Blog",
    }
  );
  return Blog;
};
