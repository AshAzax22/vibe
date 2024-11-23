// src/socket.js
const { Server } = require("socket.io");

const initializeSocket = (server) => {
  const io = new Server(server, {
    cors: {
      origin: ["http://localhost:5000", "https://vibe-rosy.vercel.app"],
      methods: ["GET", "POST"],
      allowedHeaders: ["Content-Type", "Authorization"],
      credentials: true,
    },
  });

  io.on("connection", (socket) => {
    console.log("user connected : ", socket.id);
  });

  return io;
};

module.exports = initializeSocket;
