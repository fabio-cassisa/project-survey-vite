const RadioButtonQuestion = ({ question, answer, onAnswerChange }) => {
  return (
    <div>
      <h3>{question.text}</h3>
      <div className="RadioGroup">
        {question.options.map((option) => (
          <label key={option} className="RadioLabel">
            <input
              type="radio"
              value={option}
              checked={answer === option}
              onChange={() => onAnswerChange(option)}
            />
            {option}
          </label>
        ))}
      </div>
    </div>
  );
};

export default RadioButtonQuestion;
