const driverRepository = require("../repositories/driverRepository");
const locationService = require("./locationService");

const updateLocation = async (driverId, { latitude, longitude }) => {
  const longitudeFloat = parseFloat(longitude);
  const latitudeFloat = parseFloat(latitude);

  if (isNaN(longitudeFloat) || isNaN(latitudeFloat)) {
    throw new Error("invalid coordinates");
  }

  await locationService.addDriverLocation(
    driverId,
    latitudeFloat,
    longitudeFloat
  );

  await driverRepository.updateDriverLocation(driverId, {
    type: "Point",
    coordinates: [longitudeFloat, latitudeFloat],
  });
};

module.exports = {
  updateLocation,
};
