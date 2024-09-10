// otp.js
const otpStorage = {};

const generateOtp = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

const storeOtp = (email, otp) => {
  otpStorage[email] = otp;
};

const verifyOtp = (email, otp) => {
  return otpStorage[email] && otpStorage[email] === otp;
};

const deleteOtp = (email) => {
  delete otpStorage[email];
};

module.exports = {
  generateOtp,
  storeOtp,
  verifyOtp,
  deleteOtp,
};
