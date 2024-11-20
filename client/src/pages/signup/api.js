const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const searchUser = async (email) => {
  const response = await fetch(`${API_BASE_URL}/searchuser`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email }),
  });
  return response;
};

export const login = async (email, password) => {
  const response = await fetch(`${API_BASE_URL}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });
  return response;
};

export const updatePassword = async (email, password) => {
  const response = await fetch(`${API_BASE_URL}/updatepassword`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });
  return response;
};

export const verifyOtp = async (email, otp) => {
  const response = await fetch(`${API_BASE_URL}/verifyotp`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, otp }),
  });
  return response;
};

export const signUp = async (email, password) => {
  const response = await fetch(`${API_BASE_URL}/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });
  return response;
};

export const requestOtp = async (email) => {
  const response = await fetch(`${API_BASE_URL}/requestotp`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email: email }),
  });
  return response;
};
