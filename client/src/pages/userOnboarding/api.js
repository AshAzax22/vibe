const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const searchUser = async (username) => {
  const response = await fetch(`${API_BASE_URL}/searchusername`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username: username }),
  });
  return response;
};

export const setUserProfile = async (username, index) => {
  const email = localStorage.getItem("email");
  const response = await fetch(`${API_BASE_URL}/setuserprofile`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username: username, index: index, email: email }),
  });
  return response;
};
