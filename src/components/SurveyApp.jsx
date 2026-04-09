import { useState, useEffect, useCallback } from "react";
import RadioButtonQuestion from "./RadioButtonQuestion.jsx";
import DropdownQuestion from "./DropdownQuestion.jsx";
import TextInputQuestion from "./TextInputQuestion.jsx";
import CheckboxQuestion from "./CheckboxQuestion.jsx";
import RangeSliderQuestion from "./RangeSliderQuestion.jsx";
import NewsletterQuestion from "./NewsletterQuestion.jsx";
import Progress from "./Progress";
import Summary from "./Summary.jsx";
import Header from "./Header.jsx";
import Footer from "./Footer.jsx";
import questions from "../data/questions.js";
import "../styles/SurveyApp.css";

const SurveyApp = () => {
  const [section, setSection] = useState(0);
  const [answers, setAnswers] = useState({});
  const [answeredQuestions, setAnsweredQuestions] = useState(new Set());
  const totalQuestions = questions.length;

  const handleAnswerChange = (index, answer) => {
    setAnswers((prev) => ({
      ...prev,
      [index]: answer,
    }));

    if (answer !== undefined && !answeredQuestions.has(index)) {
      setAnsweredQuestions(new Set(answeredQuestions).add(index));
    }
  };

  const isAnswered = (questionIndex) => {
    return answers[questionIndex] !== undefined;
  };

  const canProceed = useCallback(
    (questionIndex) => {
      if (questionIndex >= totalQuestions) return false;
      if (questionIndex === totalQuestions - 1 && isAnswered(questionIndex))
        return true;
      if (questions[questionIndex].type === "checkbox") return true;
      return isAnswered(questionIndex);
    },
    [answers, totalQuestions]
  );

  const handleNext = useCallback(() => {
    if (section < totalQuestions) {
      if (questions[section].type === "checkbox") {
        setAnsweredQuestions((prev) => new Set([...prev, section]));
      }
    }
    if (canProceed(section)) {
      setSection((prev) => prev + 1);
    }
  }, [section, totalQuestions, canProceed]);

  const handlePrevious = () => {
    if (section > 0) {
      setSection((prev) => prev - 1);
    }
  };

  const handleRestart = () => {
    setSection(0);
    setAnswers({});
    setAnsweredQuestions(new Set());
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Enter" && section < totalQuestions && canProceed(section)) {
        // Don't trigger if user is typing in an input
        if (
          e.target.tagName === "INPUT" &&
          (e.target.type === "text" || e.target.type === "email")
        )
          return;
        if (e.target.tagName === "TEXTAREA") return;
        handleNext();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [section, totalQuestions, canProceed, handleNext]);

  const showSummary = section === totalQuestions;

  return (
    <div className="SurveyContainer">
      <Header />
      {!showSummary && (
        <Progress current={answeredQuestions.size} total={totalQuestions} />
      )}

      {questions.map((question, index) => (
        <div
          key={index}
          className="QuestionContainer"
          style={{ display: section === index ? "block" : "none" }}
        >
          <div className="Answer">
            {question.type === "radio" && (
              <RadioButtonQuestion
                question={question}
                answer={answers[index]}
                onAnswerChange={(answer) => handleAnswerChange(index, answer)}
              />
            )}
            {question.type === "dropdown" && (
              <DropdownQuestion
                question={question}
                answer={answers[index]}
                onAnswerChange={(answer) => handleAnswerChange(index, answer)}
              />
            )}
            {question.type === "text" && (
              <TextInputQuestion
                question={question}
                answer={answers[index]}
                onAnswerChange={(answer) => handleAnswerChange(index, answer)}
              />
            )}
            {question.type === "checkbox" && (
              <CheckboxQuestion
                question={question}
                answer={answers[index]}
                onAnswerChange={(answer) => handleAnswerChange(index, answer)}
              />
            )}
            {question.type === "range" && (
              <RangeSliderQuestion
                question={question}
                answer={answers[index]}
                onAnswerChange={(answer) => handleAnswerChange(index, answer)}
              />
            )}
            {question.type === "newsletter" && (
              <NewsletterQuestion
                questionText={question.text}
                answer={answers[index]}
                onAnswerChange={(selection) => {
                  handleAnswerChange(index, selection);
                  if (selection === "No") {
                    handleAnswerChange(index + "_email", undefined);
                  }
                }}
                storedEmail={answers[index + "_email"]}
                onEmailChange={(updatedEmail) => {
                  handleAnswerChange(index + "_email", updatedEmail);
                }}
              />
            )}
          </div>
        </div>
      ))}

      {!showSummary && (
        <>
          <div className="ButtonContainer">
            {section > 0 && (
              <button className="PreviousButton" onClick={handlePrevious}>
                ← Back
              </button>
            )}
            <button
              className="NextButton"
              onClick={handleNext}
              disabled={!canProceed(section)}
            >
              {section === totalQuestions - 1 ? "See Results" : "Continue →"}
            </button>
          </div>
          {canProceed(section) && (
            <p className="KeyboardHint">
              Press <kbd>Enter ↵</kbd> to continue
            </p>
          )}
        </>
      )}

      {showSummary && (
        <Summary
          questions={questions}
          answers={answers}
          onRestart={handleRestart}
        />
      )}
      <Footer />
    </div>
  );
};

export default SurveyApp;
