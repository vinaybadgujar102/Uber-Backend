const passenger = require("../models/passenger");
const passengerService = require("../services/passengerService");

const getPassengerBookings = async (req, res) => {
  try {
    const bookings = await passengerService.getPassengerBooking(req.user._id);
    res.status(201).send({
      data: bookings,
      success: true,
      error: null,
      message: "retrieved passenger bookings",
    });
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const provideFeedback = async (req, res) => {
  try {
    const { bookingId, rating, feedback } = req.body;
    passengerService.provideFeedback(req.user._id, bookingId, rating, feedback);
    res.status(201).send({
      success: true,
      error: null,
      message: "feedback provided",
    });
  } catch (error) {}
};

module.exports = { getPassengerBookings, provideFeedback };
