"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Cart extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // Cart.belongsTo(models.Category, {
      //   foreignKey: "category",
      //   targetKey: "code",
      //   as:''
      // });
      Cart.belongsTo(models.Book, {
        foreignKey: "product",
        targetKey: "id",
        as: "book",
      });
    }
  }
  Cart.init(
    {
      product: DataTypes.STRING,
      price: DataTypes.FLOAT,
      quantity: DataTypes.FLOAT,
      userId: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Cart",
    }
  );
  return Cart;
};
