import { sequelize } from "../config/dbConfig.js";
import Cart from "./cartModel.js";
import Order from "./orderModel.js";
import OrderProduct from "./orderProduct.js";
import Product from "./productModel.js";
import User from "./userModel.js";

export const syncTables = async () => {
  User.hasMany(Product, {
    onDelete: 'CASCADE',
    foreignKey: 'product_seller'
  })

  Product.belongsTo(User, {
    foreignKey: 'product_seller'
  })

  User.hasMany(Cart, {
    onDelete: 'CASCADE',
    foreignKey: 'cart_owner',
  })

  Cart.belongsTo(User, {
    onDelete: 'CASCADE',
    foreignKey: 'cart_owner',
    as:'buyer'
  })

  Product.hasMany(Cart, {
    onDelete: 'CASCADE',
    foreignKey: 'cart_items'
  })

  Cart.belongsTo(Product, {
    onDelete: 'CASCADE',
    foreignKey: 'cart_items'
  })

  User.hasMany(Order,{
    onDelete:'CASCADE',
    foreignKey:'buyer'
  })

  Order.belongsTo(User,{
    onDelete:'CASCADE',
    foreignKey:'buyer'
  })

  Order.belongsToMany(Product,{through:OrderProduct})
  Product.belongsToMany(Order,{through:OrderProduct})
}