import React from "react";

const EmailInput = ({ value, onChange }) => (
  <input
    type="email"
    name="email"
    placeholder="Email"
    value={value}
    onChange={onChange}
  />
);

export default EmailInput;
