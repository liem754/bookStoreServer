"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Book extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // Book.belongsTo(models.Category, {
      //   foreignKey: "category",
      //   targetKey: "code",
      //   as:''
      // });
      Book.belongsTo(models.User, {
        foreignKey: "userId",
        targetKey: "id",
        as: "user",
      });
    }
  }
  Book.init(
    {
      title: DataTypes.STRING,
      author: DataTypes.STRING,
      category: DataTypes.STRING,
      publicationYear: DataTypes.STRING,
      description: DataTypes.STRING,
      price: DataTypes.FLOAT,
      quantity: DataTypes.FLOAT,
      images: DataTypes.TEXT,
      userId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Book",
    }
  );
  return Book;
};
