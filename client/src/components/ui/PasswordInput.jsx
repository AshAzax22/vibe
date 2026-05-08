import React from "react";

const PasswordInput = ({ value, onChange, placeholder = "password" }) => (
  <input
    type="password"
    name={placeholder == "password" ? "password" : "confirmPassword"}
    value={value}
    onChange={onChange}
    placeholder={placeholder}
  />
);

export default PasswordInput;
