const dotenv = require("dotenv");
const express = require("express");
const http = require("http");
const connectDB = require("./utils/db");
const cors = require("cors");
const socketIo = require("socket.io");

const authRoutes = require("./routes/authRoutes");
const bookingRoutes = require("./routes/bookingRoutes");
const passengerRoutes = require("./routes/passengerRoutes");
const driverRoutes = require("./routes/driverRouters");
const { redisClient } = require("./utils/redisClient");
const locationService = require("./services/locationService");

dotenv.config();

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.use("api/auth", authRoutes);
app.use("api/bookings", bookingRoutes(io));
app.use("api/passenger", passengerRoutes(io));
app.use("api/driver", driverRoutes);

app.listen(process.env.PORT, async () => {
  await connectDB();
  console.log(`Server is running on port ${process.env.PORT}`);
});

redisClient.on("connect", () => {
  console.log("Redis client connected to the server");
});

io.on("connection", (socket) => {
  socket.on("registerDriver", async (driverId) => {
    await locationService.setDriverSocket(driverId, socket.id);
  });

  socket.on("disconnect", async () => {
    const driverId = await locationService.getDriverSocket(
      `driver:${driverId}`
    );
    if (driverId) {
      await locationService.delDriverSocket(`driver:${driverId}`);
    }
  });
});
