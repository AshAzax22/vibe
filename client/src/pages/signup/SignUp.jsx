import React, { useEffect, useState } from "react";
import styles from "./css/signUp.module.css";
import mural from "./images/image.png";
import { useNavigate } from "react-router-dom";
import {
  searchUser,
  login,
  updatePassword,
  verifyOtp,
  signUp,
  requestOtp,
} from "./api";
import EmailInput from "./components/EmailInput";
import PasswordInput from "./components/PasswordInput";
import OtpInput from "./components/OtpInput";
import GoogleAuthButton from "./components/GoogleAuthButton";
import BackArrow from "./components/BackArrow";
import ErrorMessage from "./components/ErrorMessage";
import SubmitButton from "./components/SubmitButton";

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
  const navigate = useNavigate();

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

    setLoading(true);
    let response;
    switch (cred) {
      case "email":
        response = await searchUser(credentials.email);
        if (response.status === 201) {
          setCred("password");
        } else if (response.status === 202) {
          setCred("newUser");
        } else {
          setErrorMessage("User sign up error");
        }
        break;
      case "password":
        response = await login(credentials.email, credentials.password);
        if (response.ok) {
          alert("welcome to vibe");
          setLoading(false);
          let data = await response.json();
          if (!data.token) {
            alert("authorization failed");
            navigate("/signup");
          }
          console.log(data);
          localStorage.setItem("token", data.token);
          localStorage.setItem("email", data.email);
          navigate("/useronboarding");
        } else {
          let data = await response.json();
          setErrorMessage(data.message);
        }
        break;
      case "newUser":
        response = await verifyOtp(credentials.email, credentials.otp);
        if (response.ok) {
          response = await signUp(credentials.email, credentials.password);
          if (response.ok) {
            let data = await response.json();
            console.log(data);
            if (!data.token) {
              alert("authorization failed");
              navigate("/signup");
            }
            console.log(data);
            localStorage.setItem("token", data.token);
            localStorage.setItem("email", data.email);
            navigate("/useronboarding");
          } else {
            setErrorMessage("Signup failed");
          }
        } else {
          setErrorMessage("Invalid OTP");
        }
        break;
      case "forgotPassword":
        response = await verifyOtp(credentials.email, credentials.otp);
        if (response.ok) {
          console.log("succesfully verified otp");
          setCred("setPassword");
        } else {
          setErrorMessage("Invalid OTP");
        }
        break;
      case "setPassword":
        response = await updatePassword(
          credentials.email,
          credentials.password
        );
        if (response.ok) {
          setCred("email");
        } else {
          setErrorMessage("Password update failed");
        }
        break;
      default:
        break;
    }
    setLoading(false);
  };

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleOtpRequest = async () => {
    if (!credentials.email) {
      setErrorMessage("Email is required");
      return;
    } else if (!/\S+@\S+\.\S+/.test(credentials.email)) {
      setErrorMessage("Email is invalid");
      return;
    }

    const response = await requestOtp(credentials.email);
    if (response.ok) {
      setErrorMessage("OTP SENT");
    } else {
      let data = await response.json();
      setErrorMessage(data.message);
    }
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

  return (
    <div className={styles.body}>
      <div className={styles.muralContainer}>
        <img src={mural} alt="mural" className={styles.mural} />
      </div>

      <div className={styles.formContainer}>
        <p className={styles.brandName}>VIBE</p>
        {cred !== "email" && <BackArrow onClick={() => setCred("email")} />}

        {cred === "email" && <GoogleAuthButton />}

        {(cred === "email" || cred === "forgotPassword") && (
          <EmailInput value={credentials.email} onChange={handleChange} />
        )}

        {cred === "forgotPassword" && (
          <p className={styles.forgotPassword} onClick={handleOtpRequest}>
            request otp
          </p>
        )}

        {(cred === "forgotPassword" || cred === "newUser") && (
          <OtpInput value={credentials.otp} onChange={handleChange} />
        )}

        {(cred === "password" ||
          cred === "setPassword" ||
          cred === "newUser") && (
          <PasswordInput value={credentials.password} onChange={handleChange} />
        )}

        {(cred === "newUser" || cred === "setPassword") && (
          <PasswordInput
            value={credentials.confirmPassword}
            onChange={handleChange}
            placeholder="Confirm Password"
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
        {errorMessage && <ErrorMessage message={errorMessage} />}
        <SubmitButton loading={loading} onClick={handleSubmit} />
        {cred === "email" && (
          <p className={styles.info}>
            If you don’t have an account, we will create one.
          </p>
        )}
      </div>
    </div>
  );
};

export default SignUp;
