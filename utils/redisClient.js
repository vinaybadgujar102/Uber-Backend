const redis = require("redis");
const dotenv = require("dotenv");

dotenv.config();

const redisClient = redis.createClient({
  url: process.env.REDIS_URL,
});

redisClient.on("connect", () => {
  console.log("Redis client connected to the server");
});

redisClient.on("error", (err) => {
  console.log("Redis client not connected to the server: " + err);
});

redisClient.connect();

module.exports = { redisClient };
