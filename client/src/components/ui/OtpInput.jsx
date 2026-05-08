import React from "react";

const OtpInput = ({ value, onChange }) => (
  <input
    type="text"
    name="otp"
    value={value}
    onChange={onChange}
    placeholder="Enter OTP"
  />
);

export default OtpInput;
