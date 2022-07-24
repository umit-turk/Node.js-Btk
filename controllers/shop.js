const Product = require("../models/product");
const Category = require("../models/category");
const db = require("../utility/database");

exports.getIndex = (req, res, next) => {
  db.models.product
    .findAll({
      attributes: ["id", "name", "price", "imageUrl"],
    })
    .then((products) => {
      db.models.category
        .findAll()
        .then((categories) => {
          res.render("shop/index", {
            title: "Shopping",
            products: products,
            categories: categories,
            path: "/",
          });
        })
        .catch((err) => {
          console.log(err);
        });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.getProducts = (req, res, next) => {
  db.models.product
    .findAll({
      attributes: ["id", "name", "price", "imageUrl"],
    })
    .then((products) => {
      db.models.category
        .findAll()
        .then((categories) => {
          res.render("shop/products", {
            title: "Products",
            products: products,
            categories: categories,
            path: "/",
          });
        })
        .catch((err) => {
          console.log(err);
        });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.getProductsByCategoryId = (req, res, next) => {
  const categoryId = req.params.categoryId;
  const products = Product.getProductsByCategoryId(categoryId);
  const categories = Category.getAll();

  res.render("shop/products", {
    title: "Products",
    products: products,
    categories: categories,
    selectedCategory: categoryId,
    path: "/products",
  });
};

exports.getProduct = (req, res, next) => {
  /* db.models.product
    .findByPk(req.params.productid)
    .then((product) => {
      res.render("shop/product-detail", {
        title: product.name,
        product: product,
        path: "/products",
      });
    })
    .catch((err) => {
      console.log(err);
    }); */

  db.models.product
    .findAll({
      attributes: ["id", "name", "price", "imageUrl",'description'],
      where: { id: req.params.productid },
    })
    .then((products) => {
      res.render("shop/product-detail", {
        title: products[0].name,
        product: products[0],
        path: "/products",
      });
    })
    .catch((err) => {
      console.log(err);
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
