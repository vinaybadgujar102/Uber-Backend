const driverService = require("../services/driverService");

const updateLocation = async (req, res) => {
  const { latitude, longitude } = req.body;
  await driverService.updateLocation(req.user._id, { latitude, longitude });

  res.status(201).send({
    success: true,
    error: null,
    message: "location updated successfully",
  });
};

const getDriverBookings = async (req, res) => {
  const driverId = req.user._id;
  const driverBookings = await driverService.getDriverBookings(driverId);
  res.status(201).send({
    data: driverBookings,
    success: true,
    error: null,
    message: "retrieved driver bookings",
  });
};

module.exports = {
  updateLocation,
  getDriverBookings,
};
