export const searchUser = async (username) => {
  const response = await fetch("http://localhost:3000/searchusername", {
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
  const response = await fetch("http://localhost:3000/setuserprofile", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username: username, index: index, email: email }),
  });
  return response;
};
