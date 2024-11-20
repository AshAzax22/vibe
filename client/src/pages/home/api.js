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

export const getUserData = async () => {
  try {
    const email = localStorage.getItem("email");
    const response = await fetch(`${API_BASE_URL}/userdata?email=${email}`, {
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
