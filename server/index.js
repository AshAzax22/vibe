// index.js
const express = require("express");
const cors = require("cors");
const connectDB = require("./db/db");
const createUserRoutes = require("./routes/userRoutes");
const { PORT } = require("./config/config");
const initializeSocket = require("./socket/socket");
const http = require("http");

const app = express();
const server = http.createServer(app);
const io = initializeSocket(server);

// Connect to database
connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.options("*", cors());

// Use user routes
app.use("/", createUserRoutes(io));

io.on("connection", (socket) => {
  console.log("user connected : ", socket.id);

  socket.on("join", (userId) => {
    const roomId = userId.toString();
    socket.join(roomId);
    console.log(`User with ID ${userId} joined room ${userId}`);
  });

  socket.on("leave", (userId) => {
    const roomId = userId.toString();
    socket.leave(roomId);
    console.log(`User with ID ${userId} left room ${userId}`);
  });

  socket.on("disconnect", () => {
    console.log("A user disconnected");
  });
});

server.listen(PORT, "0.0.0.0", () => {
  console.log(`Server is running on port http://0.0.0.0:${PORT}`);
});
