const User = require("../models/user");

const updateDriverLocation = async (driverId, location) => {
  return await User.findByIdAndUpdate(
    driverId,
    {
      location,
    },
    { new: true }
  );
};

module.exports = {
  updateDriverLocation,
};
