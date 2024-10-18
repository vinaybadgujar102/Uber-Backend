const redisClient = require("../utils/redisClient");

class LocationService {
  async setDriverSocket(driverId, socketId) {
    await redisClient.set(`driver:${driverId}`, socketId);
  }

  async getDriverSocket(driverId) {
    return await redisClient.get(`driver:${driverId}`);
  }

  async delDriverSocket(driverId) {
    await redisClient.del(`driver:${driverId}`);
  }
}

module.exports = new LocationService();
