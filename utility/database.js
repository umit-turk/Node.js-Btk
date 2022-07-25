const Sequelize = require("sequelize");
//Sequelize dışarıya bir class tanımlıyor

const sequelize = new Sequelize("node-app", "root", "umit", {
  host: "localhost",
  dialect: "mysql",
});

const db = {};
db.sequelize = sequelize;
db.models = {};

db.models.category = require("../models/category")(
  sequelize,
  Sequelize.DataTypes
);
db.models.product = require("../models/product")(
  sequelize,
  Sequelize.DataTypes
);
db.models.user = require("../models/user")(sequelize, Sequelize.DataTypes);
db.models.order = require("../models/order")(sequelize, Sequelize.DataTypes);
db.models.orderItem = require("../models/orderItem")(sequelize, Sequelize.DataTypes);
db.models.cart = require("../models/cart")(sequelize, Sequelize.DataTypes);
db.models.cartItem = require("../models/cartItem")(
  sequelize,
  Sequelize.DataTypes
);

module.exports = db;
