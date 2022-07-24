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

//routes
app.use("/admin", adminRoutes);
app.use(userRoutes);

(async () => {
  await db.sequelize.sync();
})()




app.use(errorController.get404Page);

app.listen(port, () => {
  console.log(`example app listening ${port}`);
});
