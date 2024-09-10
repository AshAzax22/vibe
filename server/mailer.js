// mailer.js
const nodemailer = require("nodemailer");
const { SENDER_MAIL, MAIL_PASSWORD } = require("./config");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: SENDER_MAIL,
    pass: MAIL_PASSWORD,
  },
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

const mailOptions = (userEmail, subject, text) => {
  return {
    from: SENDER_MAIL,
    to: userEmail,
    subject: subject,
    text: text,
  };
};

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

module.exports = mailer;
