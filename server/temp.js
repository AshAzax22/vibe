const express = require("express");
const app = express();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const cors = require("cors");
const nodemailer = require("nodemailer");
require("dotenv").config();
const users = require("./models/users");

SENDER_MAIL = "chroniclesnote.org@gmail.com";
MAIL_PASSWORD = "caxu zdgd mxjc njit";

let MONGO_URI =
  "mongodb+srv://ashutosh:ashutosh@cluster0.rdfqgfc.mongodb.net/vibe";
mongoose.connect(MONGO_URI);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

const otpStorage = {};

const generateOtp = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

// Function to send OTP email
const sendOtp = (email, templateType, otp) => {
  otpStorage[email] = otp;
  const params = { otp: otp };
  mailer(email, templateType, params);
};

app.post("/searchUser", async (req, res) => {
  let { email } = req.body;
  try {
    const user = await users.findOne({ email: email });
    if (user) {
      res.status(201).send({ message: "User already exists" });
    } else {
      const otp = generateOtp();
      sendOtp(email, "otp", otp);
      res.status(202).send({ message: "User does not exist, OTP sent" });
    }
  } catch (error) {
    res.status(500).send({ message: "Internal Server Error" });
  }
});

app.post("/verifyotp", async (req, res) => {
  const { email, otp } = req.body;
  if (otpStorage[email] && otpStorage[email] == otp) {
    res.status(200).send({ message: "OTP verified successfully" });
    delete otpStorage[email];
  } else {
    res.status(400).send({ message: "Invalid OTP" });
  }
});

app.post("/signup", async (req, res) => {
  const { email, password } = req.body;
  try {
    const hashed_password = await bcrypt.hash(password, 10);
    const user = new users({
      email,
      password: hashed_password,
    });
    await user.save();
    mailer(email, "manualSignup", { text: "none" });
    res.status(200).json({ message: "signup successfull" });
  } catch (err) {
    res.status(400).json({ message: "signup failed" });
  }
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await users.findOne({ email });
    if (!user) {
      res.status(400).json({ message: "user doesnt exist" });
    }
    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      res.status(400).json({ message: "incorrect password" });
    }
    res.status(200).json({ message: "welcome to vibe" });
  } catch (err) {
    res.status(400).json({ message: "login failed" });
  }
});

app.post("/requestOtp", async (req, res) => {
  const { email } = req.body;
  try {
    const otp = generateOtp();
    sendOtp(email, "forgotPassword", otp);
    res.status(200).json({ message: "OTP sent successfully" });
  } catch (err) {
    res.status(400).json({ message: "error sending OTP" });
  }
});

app.post("/updatepassword", async (req, res) => {
  const { email, password } = req.body;
  try {
    const hashed_password = await bcrypt.hash(password, 10);
    const user = await users.findOne({ email });
    if (user) {
      user.password = hashed_password;
      await user.save();
      res.status(200).json({ message: "Password updated successfully" });
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (err) {
    res.status(400).json({ message: "Password update failed" });
  }
});

const generateEmailBody = (templateType, params) => {
  switch (templateType) {
    case "manualSignup":
      return `Hi there,

Welcome to Vibe!

We're thrilled to have you on board. At Vibe, we strive to provide you with a seamless and collaborative experience. Whether you're connecting with friends, sharing moments, or exploring new interests, our platform is designed to keep you engaged and connected.

Here's what you can do next:

Log In: Access your dashboard using your credentials. Your personal space is ready and waiting for you.
Explore Features: Take advantage of our user-friendly features designed to enhance your social experience.
Connect with Friends: Add friends and start sharing your moments. Stay connected and enjoy real-time interactions.
If you have any questions or need assistance, our support team is here to help. Feel free to reach out to us at support@vibe.com.

We're excited to see what you create and share with Vibe. Welcome to the community!

Best regards,
The Vibe Team`;
    case "googleAuth":
      return `Dear Valued User,

Congratulations on joining the Vibe community! Your account has been successfully created.

Your temporary password is: ${params.temporaryPassword}. For your security, please log in at your earliest convenience to reset your password and personalize your account.

We are thrilled to have you with us and look forward to your journey with Vibe!

Best regards,

The Vibe Team`;
    case "otp":
      return `Welcome to Vibe! We're excited to have you on board.

To complete your sign-up process, please use the following One-Time Password (OTP):

${params.otp}

Please enter it on the sign-up page to verify your account.

If you did not request this, please ignore this email or contact our support team for assistance.

Thank you for joining Vibe!

Best regards,
The Vibe Team`;

    case "forgotPassword":
      return `We received a request to reset your password for your Vibe account.

To reset your password, please use the following One-Time Password (OTP):

${params.otp}

Please enter it on the password reset page to proceed.

If you did not request a password reset, please ignore this email or contact our support team for assistance.

Best regards,
The Vibe Team`;
    default:
      return "";
  }
};

// Nodemailer transporter setup
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: SENDER_MAIL,
    pass: MAIL_PASSWORD,
  },
});

const mailOptions = (userEmail, subject, text) => {
  return {
    from: SENDER_MAIL,
    to: userEmail,
    subject: subject,
    text: text,
  };
};

// Updated mailer function to accept template type and parameters
const mailer = (userEmail, templateType, params) => {
  const subject =
    templateType === "googleAuth"
      ? "Welcome to Vibe - Your Account is Ready!"
      : templateType === "manualSignup"
      ? "Welcome to Vibe!"
      : "Your Vibe OTP Code";
  const text = generateEmailBody(templateType, params);

  transporter.sendMail(mailOptions(userEmail, subject, text), (err, info) => {
    if (err) {
      console.log(err);
    } else {
      console.log(`Email sent: ${info.response}`);
    }
  });
};

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
