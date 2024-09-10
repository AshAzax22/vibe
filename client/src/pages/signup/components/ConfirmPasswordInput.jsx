import React from "react";

const ConfirmPasswordInput = ({ value, onChange }) => (
  <input
    type="password"
    name="confirmPassword"
    value={value}
    onChange={onChange}
    placeholder="Confirm Password"
  />
);

export default ConfirmPasswordInput;
