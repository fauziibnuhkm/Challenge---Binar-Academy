const express = require("express");
const path = require("path");
const { car } = require("./models");
const expressLayouts = require("express-ejs-layouts");
const bodyParser = require("body-parser");
const routes = require("./routes");
const { default: axios } = require("axios");
const { Op } = require("sequelize");

const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(expressLayouts);

// view engine setup
app.set("view engine", "ejs");
app.set("views", __dirname + "/views");

app.use(express.static(path.join(__dirname, "public")));
app.use(express.static(path.join(__dirname, "controller")));

app.get("/", async (req, res) => {
  const cars = await car.findAll();
  res.render("index", { layout: "layouts/main-layout", title: "test", cars });
});

app.get("/cars", async (req, res) => {
  try {
    if (req.query.size) {
      const cars = await car.findAll({
        where: {
          size: {
            [Op.iLike]: req.query.size,
          },
        },
      });
      res.render("index", { layout: "layouts/main-layout", title: "test", cars });
    } else if (req.query.search) {
      const cars = await car.findAll({
        where: {
          name: {
            [Op.substring]: req.query.search,
          },
        },
      });
      res.render("index", { layout: "layouts/main-layout", title: "test", cars });
    } else {
      const cars = await car.findAll();
      res.render("index", { layout: "layouts/main-layout", title: "test", cars });
    }
  } catch (err) {
    res.status(400).json({
      status: "failed",
      message: err.message,
    });
  }
});

app.get("/cars/add-new-car", (req, res) => {
  res.render("add-new-car", { layout: "layouts/main-layout", title: "test" });
});

app.post("/cars/add-new-car", async (req, res) => {
  const { name, price, size, photo } = req.body;
  await car.create({ name, price, size, photo });
  res.redirect("/cars");
});

app.get("/cars/update-car-information/:id", async (req, res) => {
  const carDetail = await axios.get(`http://localhost:3000/api/cars/${req.params.id}`);
  res.render("update-car-information", {
    layout: "layouts/main-layout",
    title: "test",
    carDetail: carDetail.data,
  });
});

app.post("/cars/update-car-information/:id", async (req, res) => {
  const id = req.params.id;
  const { name, price, size, photo } = req.body;
  await car.update(
    {
      name,
      price,
      size,
      photo,
    },
    {
      where: {
        id,
      },
    }
  );
  res.redirect("/cars");
});

app.post("/cars/delete/:id", async (req, res) => {
  const id = req.params.id;
  await car.destroy({
    where: {
      id,
    },
  });
  res.redirect("/cars");
});

app.use(routes);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
