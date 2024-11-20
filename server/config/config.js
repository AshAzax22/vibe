require("dotenv").config();

module.exports = {
  SENDER_MAIL: process.env.SENDER_MAIL,
  MAIL_PASSWORD: process.env.MAIL_PASSWORD,
  MONGO_URI: process.env.MONGO_URI,
  PORT: process.env.PORT || 3000,
  JWT_SECRET: process.env.JWT_SECRET,
};
