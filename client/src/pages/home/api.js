const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const getUser = async () => {
  try {
    const email = localStorage.getItem("email");
    const response = await fetch(`${API_BASE_URL}/getUser?email=${email}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response;
  } catch (e) {
    console.log(e);
  }
};

export const createPoll = async (question, optionsArray, email, uploaded) => {
  try {
    const response = await fetch(`${API_BASE_URL}/createpoll`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
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
      headers: {
        "Content-Type": "application/json",
      },
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
        headers: {
          "Content-Type": "application/json",
        },
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
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ pollId, optionIndex, email }),
    });
    return response;
  } catch (err) {
    console.log(err);
  }
};

export const getUserData = async (username) => {
  try {
    const response = await fetch(
      `${API_BASE_URL}/userdata?username=${username}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response;
  } catch (e) {
    console.log(e);
  }
};

export const deletePoll = async (pollId) => {
  try {
    const email = localStorage.getItem("email");
    const response = await fetch(
      `${API_BASE_URL}/deletepoll?email=${email}&pollid=${pollId}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response;
  } catch (e) {
    console.log(e);
  }
};

export const follow = async (userFollowing, userFollowed) => {
  try {
    const response = await fetch(`${API_BASE_URL}/follow`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
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
      headers: {
        "Content-Type": "application/json",
      },
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
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, userData }),
    });
    return response;
  } catch (e) {
    console.log(e);
  }
};
