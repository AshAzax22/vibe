// index.js
const express = require("express");
const cors = require("cors");
const connectDB = require("./db/db");
const createUserRoutes = require("./routes/userRoutes");
const initializeSocket = require("./socket/socket");
const http = require("http");

const app = express();
const server = http.createServer(app);
const io = initializeSocket(server);

connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const corsOptions = {
  origin: ["http://localhost:5000", "https://vibe-rosy.vercel.app"], // Add your frontend domain here
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
};

app.use(cors(corsOptions));
app.options("*", cors(corsOptions));

app.get("/", (req, res) => {
  const { jwt_key } = require("./config/config");
  res.send(`Welcome to the API server. JWT key is ${jwt_key}`);
});

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

const PORT = process.env.PORT || 3000;
server.listen(PORT, "0.0.0.0", () => {
  console.log(`Server is running on port${PORT}`);
});
