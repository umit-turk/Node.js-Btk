const Product = require("../models/product");
const Category = require('../models/category');

exports.getIndex = (req, res, next) => {
  const products = Product.getAll();
  const categories = Category.getAll();

  res.render("shop/index", {
    title: "Shopping",
    products: products,
    categories:categories,
    path: "/",
  });
};

exports.getProducts = (req, res, next) => {
  const products = Product.getAll();
  const categories = Category.getAll();

  res.render("shop/products", {
    title: "Products",
    products: products,
    categories:categories,
    path: "/products",
  });
};

exports.getProductsByCategoryId = (req, res, next) => {
  const categoryId = req.params.categoryId;
  const products = Product.getProductsByCategoryId(categoryId)
  const categories = Category.getAll();

  res.render("shop/products", {
    title: "Products",
    products: products,
    categories:categories,
    selectedCategory: categoryId,
    path: "/products",
  });
};

exports.getProduct = (req, res, next) => {
  const productId = req.params.productid;
  const product = Product.getById(productId);
  res.render("shop/product-detail", {
    title: product.name,
    product: product,
    path: "/products",
  });
 
};

exports.getProductDetails = (req, res, next) => {
  res.render("shop/details", {
    title: "Details",
    path: "/details",
  });
};

exports.getCart = (req, res, next) => {
  res.render("shop/cart", {
    title: "Cart",
    path: "/cart",
  });
};

exports.getOrders = (req, res, next) => {
  res.render("shop/orders", {
    title: "Orders",
    path: "/orders",
  });
};
