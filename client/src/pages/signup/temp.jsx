import React, { useEffect, useState } from "react";
import styles from "./css/signUp.module.css";
import mural from "./images/image.png";
import googleLogo from "./images/google.svg";

const SignUp = () => {
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    otp: "",
  });
  const [cred, setCred] = useState("email");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const validate = () => {
    if (cred === "email" || cred === "forgotPassword") {
      if (!credentials.email) {
        setErrorMessage("Email is required");
        return false;
      } else if (!/\S+@\S+\.\S+/.test(credentials.email)) {
        setErrorMessage("Email is invalid");
        return false;
      }
    }

    if (cred === "forgotPassword" || cred === "newUser") {
      if (!credentials.otp) {
        setErrorMessage("OTP is required");
        return false;
      }
    }

    if (cred === "password" || cred === "setPassword" || cred === "newUser") {
      if (!credentials.password) {
        setErrorMessage("Password is required");
        return false;
      } else if (credentials.password.length < 6) {
        setErrorMessage("Password must be at least 6 characters");
        return false;
      }
    }

    if (cred === "newUser" || cred === "setPassword") {
      if (!credentials.confirmPassword) {
        setErrorMessage("Confirm Password is required");
        return false;
      } else if (credentials.password !== credentials.confirmPassword) {
        setErrorMessage("Passwords do not match");
        return false;
      }
    }

    setErrorMessage(""); // Clear any previous error messages
    return true;
  };

  const handleSubmit = async () => {
    if (!validate()) {
      return;
    }

    if (cred === "email") {
      setLoading(true);
      let response = await fetch("http://localhost:3000/searchUser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: credentials.email }),
      });
      setLoading(false);
      console.log(response);
      // response = await response.json();
      // console.log(response);
      if (response.status == 201) {
        setCred("password");
      } else if (response.status == 202) {
        setCred("newUser");
      } else {
        setErrorMessage("User sign up error");
      }
    } else if (cred === "password") {
      if (await login()) {
        setCred("email");
      } else {
        setErrorMessage("Login failed");
      }
    } else if (cred === "newUser") {
      if (await verifyOtp()) {
        SignUp();
      } else {
        setErrorMessage("invalid otp");
      }
    } else if (cred === "forgotPassword") {
      if (await verifyOtp()) {
        setCred("setPassword");
      } else {
        setErrorMessage("invalid otp");
      }
    } else if (cred === "setPassword") {
      await updatePassword();
      setCred("email");
    }
  };

  const login = async () => {
    setLoading(true);
    let response = await fetch("http://localhost:3000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: credentials.email,
        password: credentials.password,
      }),
    });
    if (!response.ok) {
      setErrorMessage("Login failed");
      setLoading(false);
      return false;
    }
    response = await response.json();
    alert(response.message);
    setLoading(false);
    return true;
  };

  const updatePassword = async () => {
    setLoading(true);
    let response = await fetch("http://localhost:3000/updatepassword", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: credentials.email,
        password: credentials.password,
      }),
    });
    if (!response.ok) {
      setErrorMessage("Password update failed");
      setLoading(false);
      return;
    }
    response = await response.json();
    console.log(response.message);
    setLoading(false);
    alert("password updated successfully");
  };

  const verifyOtp = async () => {
    setLoading(true);
    let response = await fetch("http://localhost:3000/verifyotp", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: credentials.email,
        otp: credentials.otp,
      }),
    });
    if (!response.ok) {
      setErrorMessage("Invalid OTP");
      setLoading(false);
      return false;
    }
    response = await response.json();
    console.log(response.message);
    setLoading(false);
    return true;
  };

  const SignUp = async () => {
    let response = await fetch("http://localhost:3000/signUp", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: credentials.email,
        password: credentials.password,
      }),
    });
    if (!response.ok) {
      setErrorMessage("user creation failed");
      return;
    }
    response = await response.json();
    console.log(response.message);
    alert("sign up succesfull");
    setCred("email");
  };

  const handleOtpRequest = async () => {
    let response = await fetch("http://localhost:3000/requestOtp", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: credentials.email }),
    });
    if (!response.ok) {
      setErrorMessage("OTP request failed");
      return;
    }
    setErrorMessage("OTP sent");
    response = await response.json();
    console.log(response.message);
  };

  useEffect(() => {
    setErrorMessage("");
    setCredentials(
      cred === "email"
        ? { email: "", password: "", confirmPassword: "", otp: "" }
        : {
            email: credentials.email,
            password: "",
            confirmPassword: "",
            otp: "",
          }
    );
  }, [cred]);

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  return (
    <div className={styles.body}>
      <div className={styles.muralContainer}>
        <img src={mural} alt="mural" className={styles.mural} />
      </div>

      <div className={styles.formContainer}>
        <p className={styles.brandName}>VIBE</p>
        {cred != "email" && (
          <svg
            className={styles.backArrow}
            width="25"
            height="15"
            viewBox="0 0 25 15"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            onClick={() => setCred("email")}
          >
            <path
              d="M24.7005 8.21977C25.091 7.82925 25.091 7.19608 24.7005 6.80556L18.3366 0.441597C17.946 0.0510727 17.3129 0.0510727 16.9223 0.441597C16.5318 0.832121 16.5318 1.46529 16.9223 1.85581L22.5792 7.51266L16.9223 13.1695C16.5318 13.56 16.5318 14.1932 16.9223 14.5837C17.3129 14.9743 17.946 14.9743 18.3366 14.5837L24.7005 8.21977ZM-0.0065918 8.51266H23.9934V6.51266H-0.0065918L-0.0065918 8.51266Z"
              fill="white"
            />
          </svg>
        )}

        {cred === "email" && (
          <button className={styles.googleAuthContainer}>
            <img src={googleLogo} alt="google" />
            <p>Sign in with Google</p>
          </button>
        )}

        {(cred === "email" || cred === "forgotPassword") && (
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={credentials.email}
            onChange={handleChange}
          />
        )}

        {cred === "forgotPassword" && (
          <p className={styles.forgotPassword} onClick={handleOtpRequest}>
            request otp
          </p>
        )}

        {cred === "otp" && (
          <p className={styles.info}>Enter OTP sent to your email</p>
        )}

        {(cred === "forgotPassword" || cred === "newUser") && (
          <input
            type="text"
            name="otp"
            value={credentials.otp}
            onChange={handleChange}
            placeholder="Enter OTP"
          />
        )}

        {(cred === "password" ||
          cred === "setPassword" ||
          cred === "newUser") && (
          <input
            type="password"
            name="password"
            value={credentials.password}
            onChange={handleChange}
            placeholder="password"
          ></input>
        )}

        {(cred === "newUser" || cred === "setPassword") && (
          <input
            type="password"
            name="confirmPassword"
            value={credentials.confirmPassword}
            onChange={handleChange}
            placeholder="confirm password"
          />
        )}

        {(cred === "email" || cred === "password") && (
          <p
            className={styles.forgotPassword}
            onClick={() => setCred("forgotPassword")}
          >
            Forgot Password ?
          </p>
        )}
        {errorMessage && (
          <p className={styles.info} style={{ color: "red" }}>
            {errorMessage}
          </p>
        )}
        <button
          className={styles.letsGo}
          disabled={loading}
          onClick={handleSubmit}
        >
          {loading ? "Loading.." : "Let's go"}
        </button>
        {cred == "email" && (
          <p className={styles.info}>
            If you don’t have an account, we will create one.
          </p>
        )}
      </div>
    </div>
  );
};

export default SignUp;
