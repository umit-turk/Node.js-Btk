const express = require("express");
const bodyParser = require("body-parser");
const userRoutes = require("./routes/shop");
const path = require("path");
const ejs = require("ejs");
const adminRoutes = require("./routes/admin");
const errorController = require("./controllers/errors");
const db = require("./utility/database.js");

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "ejs");

app.use((req, res, next) => {
  db.models.user
    .findByPk(1)
    .then((user) => {
      req.user = user;
      next();
    })
    .catch((err) => {
      console.log(err);
    });
});

//routes
app.use("/admin", adminRoutes);
app.use(userRoutes);

db.models.product.belongsTo(db.models.category, {
  foreignKey: {
    allowNull: false,
  },
});
db.models.category.hasMany(db.models.product);

db.models.product.belongsTo(db.models.user);
db.models.user.hasMany(db.models.product);

db.models.user.hasOne(db.models.cart);
db.models.cart.belongsTo(db.models.user);

db.models.cart.belongsToMany(db.models.product, {
  through: db.models.cartItem,
});
db.models.product.belongsToMany(db.models.cart, {
  through: db.models.cartItem,
});

db.models.order.belongsTo(db.models.user);
db.models.user.hasMany(db.models.order);

db.models.order.belongsToMany(db.models.product, {
  through: db.models.orderItem,
});
db.models.product.belongsToMany(db.models.order, {
  through: db.models.orderItem,
});

let _user;

db.sequelize
  /*  .sync({ force: true }) */
  .sync()
  .then(() => {
    db.models.user
      .findByPk(1)
      .then((user) => {
        if (!user) {
          return user.create({
            name: "umitturk",
            email: "email@gmail.com",
          });
        }
        return user;
      })
      .then((user) => {
        _user = user;
        return user.getCart();
      })
      .then((cart) => {
        if (!cart) {
          return _user.createCart();
        }
        return cart;
      })
      .then(() => {
        db.models.category.count().then((count) => {
          if (count === 0) {
            db.models.category.bulkCreate([
              { name: "Telefon", description: "telefon kategorisi" },
              { name: "Bilgisayar", description: "bilgisayar kategorisi" },
              { name: "Elektronik", description: "elektronik kategorisi" },
            ]);
          }
        });
      });
  })
  .catch((err) => {
    console.log(err);
  });

app.use(errorController.get404Page);

app.listen(port, () => {
  console.log(`example app listening ${port}`);
});
