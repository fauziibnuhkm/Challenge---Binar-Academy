const { car } = require("../models");

async function getCarById(req, res) {
  try {
    // Primary Key = PK
    const id = req.params.id;
    const data = await car.findByPk(id);

    res.status(200).json({
      status: "success",
      data,
    });
  } catch (err) {
    res.status(404).json({
      status: "failed",
      message: err.message,
    });
  }
}

async function createCar(req, res) {
  try {
    const { name, price, size, photo } = req.body;
    const newCar = await car.create({
      name,
      price,
      size,
      photo,
    });
    res.status(201).json({
      status: "success",
      data: {
        car: newCar,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "failed",
      message: err.message,
    });
  }
}

module.exports = { getCarById, createCar };
