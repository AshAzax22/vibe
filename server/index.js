// index.js
const express = require("express");
const cors = require("cors");
const connectDB = require("./db");
const userRoutes = require("./routes/userRoutes");
const { PORT } = require("./config");

const app = express();

// Connect to database
connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Use user routes
app.use("/", userRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
