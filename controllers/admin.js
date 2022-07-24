const Product = require("../models/product");
const Category = require("../models/category");

exports.getProducts = (req, res, next) => {
  Product.getAll()
    .then((products) => {
      res.render("admin/products.ejs", {
        title: "Admin Producuts",
        products: products[0],
        path: "/admin/products",
        action: req.query.action,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.getAddProduct = (req, res, next) => {
  const categories = Category.getAll();

  res.render("admin/add-product", {
    title: "New Product",
    path: "/admin/add-product",
    categories: categories,
  });
};

exports.postAddProduct = (req, res, next) => {
  const product = new Product();
  (product.name = req.body.name),
    (product.price = req.body.price),
    (product.imageUrl = req.body.imageUrl),
    (product.categoryId = req.body.categoryId),
    (product.description = req.body.description),
    product
      .saveProduct()
      .then(() => {
        res.redirect("/");
      })
      .catch((err) => {
        console.log(err);
      });
};

exports.getEditProduct = (req, res, next) => {
  const categories = Category.getAll();

  Product.getById(req.params.productid)
    .then((product) => {
      res.render("admin/edit-product", {
        title: "Edit Product",
        path: "/admin/products",
        product: product[0][0],
        categories: categories,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.postEditProduct = (req, res, next) => {
  const product = new Product();

  
  product.id = req.body.id;
  product.name = req.body.name;
  product.price = req.body.price;
  product.imageUrl = req.body.imageUrl;
  product.description = req.body.description;
  product.categoryId = req.body.categoryId;

  Product.Update(product)
    .then(() => {
      res.redirect("/admin/products?action=edit");
    })
    .catch((err) => {
      console.log(err,"?");
    });
};

exports.postDeleteProduct = (req, res, next) => {
  Product.DeleteById(req.body.productId).then(() => {
    res.redirect("/admin/products?action=delete");

  }).catch((err) => {
    console.log(err);
  })
};
