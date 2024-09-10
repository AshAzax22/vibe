export const searchUser = async (email) => {
  const response = await fetch("http://localhost:3000/searchUser", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email }),
  });
  return response;
};

export const login = async (email, password) => {
  const response = await fetch("http://localhost:3000/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });
  return response;
};

export const updatePassword = async (email, password) => {
  const response = await fetch("http://localhost:3000/updatepassword", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });
  return response;
};

export const verifyOtp = async (email, otp) => {
  const response = await fetch("http://localhost:3000/verifyotp", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, otp }),
  });
  return response;
};

export const signUp = async (email, password) => {
  const response = await fetch("http://localhost:3000/signUp", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });
  return response;
};

export const requestOtp = async (email) => {
  const response = await fetch("http://localhost:3000/requestOtp", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email: email }),
  });
  return response;
};
