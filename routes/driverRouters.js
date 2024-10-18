const express = require("express");
const authMiddleware = require("../middlewares/authMiddleware");
const router = express.Router();
const {
  getDriverBookings,
  updateLocation,
} = require("../controllers/driverController");

router.get("/bookings", authMiddleware, getDriverBookings);
router.get("/location", authMiddleware, updateLocation);

module.exports = router;
