const Sequelize = require("sequelize");
//Sequelize dışarıya bir class tanımlıyor

const sequelize = new Sequelize("node-app", "root", "umit", {
  host: "localhost",
  dialect: "mysql",
});
const db = {};
db.sequelize = sequelize;
db.models = {};
db.models.category = require('../models/category')(sequelize, Sequelize.DataTypes);
db.models.product = require("../models/product")(sequelize, Sequelize.DataTypes);

module.exports = db;
