const router = require("express").Router();

const carController = require("../controller/carController");

// API
router.get("/api/cars/:id", carController.getCarById);
router.post("/api/cars", carController.createCar);

module.exports = router;
