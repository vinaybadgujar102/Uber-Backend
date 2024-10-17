const express = require("express");

const router = express.Router();

module.exports = (io) => {
  router.get("/bookings", authMiddleware, getPassengerBookings);
  router.post("/feedback", authMiddleware, provideFeedback);

  return router;
};
