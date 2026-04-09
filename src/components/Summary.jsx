import {
  suggestions_map,
  checkbox_suggestions,
  checkbox_unchecked_suggestions,
  getJsKnowledgeSuggestion,
} from "./SuggestionsMap";

const Summary = ({ questions, answers, onRestart }) => {
  return (
    <div className="SummaryContainer">
      <h2>Your Results</h2>
      {questions.map((question, index) => {
        if (question.type === "radio" || question.type === "dropdown") {
          const suggestion = suggestions_map[question.text]?.[answers[index]];
          return (
            <div key={index} className="SummaryCard">
              <p className="SummaryQuestion">{question.text}</p>
              <p className="SummaryAnswer">{answers[index]}</p>
              {suggestion && (
                <p className="SummarySuggestion">{suggestion}</p>
              )}
            </div>
          );
        } else if (question.type === "checkbox") {
          return (
            <div key={index} className="SummaryCard">
              <p className="SummaryQuestion">{question.text}</p>
              <ul className="SummaryChecklist">
                {question.options.map((option) => {
                  const answerExists =
                    answers[index] && answers[index].includes(option);
                  return (
                    <li key={option}>
                      <span
                        className={`SummaryChecklistStatus ${
                          answerExists ? "done" : "todo"
                        }`}
                      >
                        {answerExists ? "Done" : "To do"}
                      </span>
                      {option}
                      <p className="SummarySuggestion">
                        {answerExists
                          ? checkbox_suggestions[option]
                          : checkbox_unchecked_suggestions[option]}
                      </p>
                    </li>
                  );
                })}
              </ul>
            </div>
          );
        } else if (question.type === "range") {
          const knowledgeSuggestions = getJsKnowledgeSuggestion(answers[index]);
          return (
            <div key={index} className="SummaryCard">
              <p className="SummaryQuestion">{question.text}</p>
              <p className="SummaryAnswer">Score: {answers[index]}/10</p>
              <span className="SummaryLevel">
                {knowledgeSuggestions.level}
              </span>
              <ul className="SummarySuggestionList">
                {knowledgeSuggestions.suggestions.map((suggestion, sIndex) => (
                  <li key={sIndex}>{suggestion}</li>
                ))}
              </ul>
            </div>
          );
        } else if (question.type === "newsletter") {
          if (!answers[index] || answers[index] === "No") return null;
          return (
            <div key={index} className="SummaryCard">
              <p className="SummaryQuestion">Newsletter</p>
              <p className="EmailSuccess">
                ✓ Subscribed — we'll keep you in the loop
              </p>
            </div>
          );
        }
        return null;
      })}
      <button className="RestartButton" onClick={onRestart}>
        ↺ Take the survey again
      </button>
    </div>
  );
};

export default Summary;
