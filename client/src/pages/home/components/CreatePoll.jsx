import { useState } from "react";
import styles from "../css/createPoll.module.css";
import { createPoll } from "../api";
import PopUp from "./PopUp";

const CreatePoll = () => {
  const [question, setQuestion] = useState("");
  const [optionsArray, setOptionsArray] = useState([""]); // Initialize with one empty option
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [popUpMessage, setPopUpMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [showPopUp, setShowPopUp] = useState(false);

  const addOption = () => {
    setOptionsArray([...optionsArray, ""]);
  };

  const removeOption = (index) => {
    setOptionsArray(optionsArray.filter((_, i) => i !== index));
  };

  const handleOptionChange = (index, value) => {
    const newOptions = [...optionsArray];
    newOptions[index] = value;
    setOptionsArray(newOptions);
  };

  const handleSubmit = async () => {
    // Validation
    if (!question.trim()) {
      setError("Question cannot be empty.");
      return;
    }

    if (optionsArray.length < 2) {
      setError("At least two options are required.");
      return;
    }

    for (let option of optionsArray) {
      if (!option.trim()) {
        setError("Options cannot be empty.");
        return;
      }
    }

    setError(""); // Clear any previous errors

    const uploaded = new Date().toISOString();

    setIsLoading(true);
    let email = localStorage.getItem("email");
    let response = await createPoll(question, optionsArray, email, uploaded);
    if (response.ok) {
      setQuestion("");
      setOptionsArray([""]);
      setPopUpMessage("Poll created successfully!");
      setIsSuccess(true);
      setShowPopUp(true);
      setTimeout(() => {
        setShowPopUp(false);
      }, 1500);
    } else {
      setError("FAILED TO CREATE POLL");
    }
    setIsLoading(false);
  };

  return (
    <>
      {showPopUp && <PopUp message={popUpMessage} isSuccess={isSuccess} />}
      <div className={styles.createPollContainer}>
        <div className={styles.title}>Create a Poll</div>
        <div className={styles.inputContainer}>
          <h1>Enter Your Question :</h1>
          <input
            type="text"
            placeholder="Be creative"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            className={styles.questionInput}
          />
          {optionsArray.map((option, index) => (
            <div key={index} className={styles.optionContainer}>
              <input
                type="text"
                placeholder="Enter option"
                value={option}
                onChange={(e) => handleOptionChange(index, e.target.value)}
                className={styles.optionInput}
              />
              <button
                onClick={() => removeOption(index)}
                className={styles.removeOptionButton}
              >
                Remove
              </button>
            </div>
          ))}
          {error && <div className={styles.error}>{error}</div>}
          <div className={styles.buttonsContainer}>
            <button onClick={addOption} className={styles.addOptionButton}>
              Add an option
            </button>
            <button
              className={styles.createPollButton}
              onClick={handleSubmit}
              disabled={isLoading}
            >
              {isLoading ? "Creating..." : "Create Poll"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreatePoll;
