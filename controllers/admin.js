const db = require("../utility/database");

exports.getProducts = (req, res, next) => {
  db.models.product
    .findAll()
    .then((products) => {
      res.render("admin/products.ejs", {
        title: "Admin Producuts",
        products: products,
        path: "/admin/products",
        action: req.query.action,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.getAddProduct = (req, res, next) => {
  db.models.category
    .findAll()
    .then((categories) => {
      res.render("admin/add-product", {
        title: "New Product",
        path: "/admin/add-product",
        categories: categories,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.postAddProduct = async (req, res, next) => {
  const name = req.body.name;
  const price = req.body.price;
  const imageUrl = req.body.imageUrl;
  const description = req.body.description;
  const categoryId = req.body.categoryId;
  const user = req.user;
  console.log(user,"user");

  user.createProduct({
      name: name,
      price: price,
      imageUrl: imageUrl,
      description: description,
      categoryId: categoryId,
    })
    .then(() => {
      res.redirect("/");
    })
    .catch((err) => {
      console.log(err,"?");
    });
};

exports.getEditProduct = (req, res, next) => {
  db.models.product
    .findByPk(req.params.productId)
    .then((product) => {
      if (!product) {
        return res.redirect("/");
      }
      db.models.category
        .findAll()
        .then((categories) => {
          res.render("admin/edit-product", {
            title: "Edit Product",
            path: "/admin/products",
            product: product,
            categories: categories,
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

exports.postEditProduct = (req, res, next) => {
  const id = req.body.id;
  const name = req.body.name;
  const price = req.body.price;
  const imageUrl = req.body.imageUrl;
  const description = req.body.description;
  const categoryId = req.body.categoryId;

  db.models.product
    .findByPk(id)
    .then((product) => {
      product.name = name;
      product.price = price;
      product.imageUrl = imageUrl;
      product.description = description;
      product.categoryId = categoryId;
      return product.save();
    })
    .then(() => {
      res.redirect("/admin/products?action=edit");
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.postDeleteProduct = (req, res, next) => {
  const id = req.body.productId;

  db.models.product
    .findByPk(id)
    .then((product) => {
      return product.destroy();
    })
    .then((result) => {
      console.log("product has been deleted");
      res.redirect("/admin/products?action=delete");
    })
    .catch((err) => console.log(err));
};
