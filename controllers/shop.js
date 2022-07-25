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
  const model = {};
  db.models.category
    .findAll()
    .then((categories) => {
      model.categories = categories;
      const category = categories.find((i) => i.id == categoryId);
      return category.getProducts();
    })
    .then((products) => {
      res.render("shop/products", {
        title: "Products",
        products: products,
        categories: model.categories,
        selectedCategory: categoryId,
        path: "/products",
      });
    })
    .catch((err) => {
      console.log(err);
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
      attributes: ["id", "name", "price", "imageUrl", "description"],
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
  let total = 0;

  req.user
    .getCart()
    .then((cart) => {
      return cart
        .getProducts()
        .then((products) => {
          for (let i = 0; i < products.length; i++) {
            total += products[i].price * products[i].cartItem.quantity;
          }
          res.render("shop/cart", {
            title: "Cart",
            path: "/cart",
            products: products,
            total: total,
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

exports.postCart = (req, res, next) => {
  const productId = req.body.productId;
  let quantity = 1;
  let userCart;

  req.user
    .getCart()
    .then((cart) => {
      userCart = cart;

      return cart.getProducts({ where: { id: productId } });
    })
    .then((products) => {
      let product;
      if (products.length > 0) {
        product = products[0];
      }
      if (product) {
        quantity += product.cartItem.quantity;
        return product;
      }
      return db.models.product.findByPk(productId);
    })
    .then((product) => {
      userCart.addProduct(product, {
        through: {
          quantity: quantity,
        },
      });
    })
    .then(() => {
      res.redirect("/cart");
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.postCartItemDelete = (req, res, next) => {
  const productId = req.body.productId;

  req.user
    .getCart()
    .then((cart) => {
      return cart.getProducts({ where: { id: productId } });
    })
    .then((products) => {
      const product = products[0];
      return product.cartItem.destroy();
    })
    .then((result) => {
      res.redirect("/cart");
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.getOrders = (req, res, next) => {
  req.user
    .getOrders({ include: ["products"] })
    .then((orders) => {
      console.log(orders);

      res.render("shop/orders", {
        title: "Orders",
        path: "/orders",
        orders: orders,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.postOrder = (req, res, next) => {
  let userCart;
  req.user
    .getCart()
    .then((cart) => {
      userCart = cart;
      return cart.getProducts();
    })
    .then((products) => {
    
      return req.user
        .createOrder()
        .then((order) => {
          order.addProducts(
            products.map((product) => {
              product.orderItem = {
                quantity: product.cartItem.quantity,
                price: product.price,
              };
              return product;
            })
          );
        })
        .catch((err) => {
          console.log(err);
        });
    })
    .then(() => {
      userCart.setProducts(null);
    })
    .then(() => {
      res.redirect("/orders");
    })
    .catch((err) => {
      console.log(err);
    });
};
