import { useState } from "react";

const emailValidation = (email) => {
  const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
  return regex.test(email);
};

const NewsletterQuestion = ({
  questionText,
  answer,
  onAnswerChange,
  storedEmail,
}) => {
  const [emailState, setEmailState] = useState({
    email: storedEmail || "",
    isEmailValid: emailValidation(storedEmail || ""),
    isSubmitted: false,
  });

  const handleRadioChange = (selection) => {
    if (selection === "No" && emailState.isSubmitted) {
      setEmailState({
        email: "",
        isEmailValid: false,
        isSubmitted: false,
      });
    } else {
      setEmailState((prevState) => ({
        ...prevState,
        isSubmitted: false,
      }));
    }
    onAnswerChange(selection);
  };

  const handleEmailChange = (updatedEmail) => {
    setEmailState((prevState) => ({
      ...prevState,
      email: updatedEmail,
      isEmailValid: emailValidation(updatedEmail) || updatedEmail === "",
    }));
  };

  const handleSubmission = () => {
    if (!emailState.isSubmitted && emailState.isEmailValid) {
      setEmailState((prevState) => ({
        ...prevState,
        isSubmitted: true,
      }));
      onAnswerChange(emailState.email);
    }
  };

  return (
    <div>
      <h3>{questionText}</h3>
      <div className="RadioGroup">
        <label className="RadioLabel">
          <input
            type="radio"
            value="Yes"
            checked={answer === "Yes" || (answer && answer !== "No")}
            onChange={() => handleRadioChange("Yes")}
          />
          Yes, sign me up!
        </label>
        <label className="RadioLabel">
          <input
            type="radio"
            value="No"
            checked={answer === "No"}
            onChange={() => handleRadioChange("No")}
          />
          No thanks
        </label>
      </div>
      {answer === "Yes" && !emailState.isSubmitted && (
        <div>
          <input
            type="email"
            className="EmailInput"
            value={emailState.email}
            onChange={(e) => handleEmailChange(e.target.value)}
            placeholder="you@example.com"
            onKeyDown={(e) => {
              if (e.key === "Enter" && emailState.isEmailValid && emailState.email) {
                handleSubmission();
              }
            }}
          />
          <button
            onClick={handleSubmission}
            disabled={!emailState.isEmailValid || emailState.email === ""}
            className="SubmitButton"
          >
            Subscribe
          </button>
          {!emailState.isEmailValid && emailState.email !== "" && (
            <p className="EmailError">Please enter a valid email address.</p>
          )}
        </div>
      )}
      {emailState.isSubmitted && (
        <p className="EmailSuccess">✓ Successfully subscribed!</p>
      )}
    </div>
  );
};

export default NewsletterQuestion;
