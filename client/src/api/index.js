const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// --- AUTH API ---
export const searchUser = async (email) => {
  const response = await fetch(`${API_BASE_URL}/searchuser`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email }),
  });
  return response;
};

export const login = async (email, password) => {
  const response = await fetch(`${API_BASE_URL}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  return response;
};

export const updatePassword = async (email, password) => {
  const response = await fetch(`${API_BASE_URL}/updatepassword`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  return response;
};

export const verifyOtp = async (email, otp) => {
  const response = await fetch(`${API_BASE_URL}/verifyotp`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, otp }),
  });
  return response;
};

export const signUp = async (email, password) => {
  const response = await fetch(`${API_BASE_URL}/signup`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  return response;
};

export const requestOtp = async (email) => {
  const response = await fetch(`${API_BASE_URL}/requestotp`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email: email }),
  });
  return response;
};

export const googleAuthLogin = async (email) => {
  const response = await fetch(`${API_BASE_URL}/googlelogin`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email: email }),
  });
  return response;
};

// --- USER API ---
export const searchUsername = async (username) => {
  const response = await fetch(`${API_BASE_URL}/searchusername`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username: username }),
  });
  return response;
};

export const setUserProfile = async (username, index) => {
  const email = localStorage.getItem("email");
  const response = await fetch(`${API_BASE_URL}/setuserprofile`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username: username, index: index, email: email }),
  });
  return response;
};

export const getUser = async () => {
  try {
    const email = localStorage.getItem("email");
    const response = await fetch(`${API_BASE_URL}/getUser?email=${email}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    return response;
  } catch (e) {
    console.log(e);
  }
};

export const getUserData = async (username) => {
  try {
    const response = await fetch(`${API_BASE_URL}/userdata?username=${username}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    return response;
  } catch (e) {
    console.log(e);
  }
};

export const follow = async (userFollowing, userFollowed) => {
  try {
    const response = await fetch(`${API_BASE_URL}/follow`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userFollowing, userFollowed }),
    });
    return response;
  } catch (e) {
    console.log(e);
  }
};

export const unfollow = async (userUnFollowing, userUnFollowed) => {
  try {
    const response = await fetch(`${API_BASE_URL}/unfollow`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userUnFollowing, userUnFollowed }),
    });
    return response;
  } catch (e) {
    console.log(e);
  }
};

export const updateUserProfile = async (userData) => {
  const email = localStorage.getItem("email");
  try {
    const response = await fetch(`${API_BASE_URL}/updateuserprofile`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, userData }),
    });
    return response;
  } catch (e) {
    console.log(e);
  }
};

// --- POLL API ---
export const createPoll = async (question, optionsArray, email, uploaded) => {
  try {
    const response = await fetch(`${API_BASE_URL}/createpoll`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ question, optionsArray, email, date: uploaded }),
    });
    return response;
  } catch (err) {
    console.log(err);
  }
};

export const getPolls = async () => {
  try {
    const email = localStorage.getItem("email");
    const response = await fetch(`${API_BASE_URL}/getpolls?email=${email}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    if (response.ok) {
      let data = await response.json();
      return data;
    } else {
      return false;
    }
  } catch (e) {
    console.log(e);
    return false;
  }
};

export const getPoll = async (pollId) => {
  try {
    const email = localStorage.getItem("email");
    const response = await fetch(
      `${API_BASE_URL}/getpoll/?email=${email}&pollId=${pollId}`,
      {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      }
    );
    return response;
  } catch (e) {
    console.log(e);
  }
};

export const poll = async (pollId, optionIndex, email) => {
  try {
    const response = await fetch(`${API_BASE_URL}/poll`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ pollId, optionIndex, email }),
    });
    return response;
  } catch (err) {
    console.log(err);
  }
};

export const deletePoll = async (pollId) => {
  try {
    const email = localStorage.getItem("email");
    const response = await fetch(
      `${API_BASE_URL}/deletepoll?email=${email}&pollid=${pollId}`,
      {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      }
    );
    return response;
  } catch (e) {
    console.log(e);
  }
};

export const getTrendingPolls = async () => {
  try {
    const email = localStorage.getItem("email");
    const response = await fetch(`${API_BASE_URL}/trendingPolls?email=${email}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    return response;
  } catch (e) {
    console.log(e);
  }
};

export const getTrendingUsers = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/trendingUsers`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    return response;
  } catch (e) {
    console.log(e);
  }
};

export const searchPolls = async (query) => {
  try {
    const email = localStorage.getItem("email");
    const response = await fetch(`${API_BASE_URL}/searchPolls?query=${query}&email=${email}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    return response;
  } catch (e) {
    console.log(e);
  }
};

export const searchUsers = async (query) => {
  try {
    const response = await fetch(`${API_BASE_URL}/searchUsers?query=${query}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    return response;
  } catch (e) {
    console.log(e);
  }
};

export const savePoll = async (pollId) => {
  try {
    const email = localStorage.getItem("email");
    const response = await fetch(`${API_BASE_URL}/savePoll`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, pollId }),
    });
    return response;
  } catch (e) {
    console.log(e);
  }
};

export const unsavePoll = async (pollId) => {
  try {
    const email = localStorage.getItem("email");
    const response = await fetch(`${API_BASE_URL}/unsavePoll`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, pollId }),
    });
    return response;
  } catch (e) {
    console.log(e);
  }
};

export const getSavedPolls = async () => {
  try {
    const email = localStorage.getItem("email");
    const response = await fetch(`${API_BASE_URL}/savedPolls?email=${email}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    return response;
  } catch (e) {
    console.log(e);
  }
};

export const addComment = async (pollId, text, parentId = null) => {
  try {
    const email = localStorage.getItem("email");
    const response = await fetch(`${API_BASE_URL}/addComment`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, pollId, text, parentId }),
    });
    return response;
  } catch (e) {
    console.log(e);
  }
};

export const getComments = async (pollId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/getComments?pollId=${pollId}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    return response;
  } catch (e) {
    console.log(e);
  }
};

export const deleteComment = async (commentId) => {
  try {
    const email = localStorage.getItem("email");
    const response = await fetch(
      `${API_BASE_URL}/deleteComment?email=${email}&commentId=${commentId}`,
      {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      }
    );
    return response;
  } catch (e) {
    console.log(e);
  }
};
