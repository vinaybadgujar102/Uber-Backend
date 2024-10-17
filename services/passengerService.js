const bookingRepository = require("../repositories/bookingRepository");
const passengerRepository = require("../repositories/passengerRepository");

const getPassengerBookings = async (passengerId) => {
  try {
    const passengerDetails = await passengerRepository.findPassengerById(
      passengerId
    );
    if (!passengerDetails) throw new Error("Passenger not found");
    return passengerDetails;
  } catch (error) {}
};

const provideFeedback = async (passengerId, bookingId, rating, feedback) => {
  const booking = await bookingRepository.findBooking({
    _id: bookingId,
    passenger: passengerId,
  });
  if (!booking) throw new Error("Booking not found");
  booking.rating = rating;
  booking.feedback = feedback;
  await booking.save();
};

module.exports = { getPassengerBookings, provideFeedback };
