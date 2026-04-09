const CheckboxQuestion = ({ question, answer = [], onAnswerChange }) => {
  const handleCheckboxChange = (event) => {
    const { value, checked } = event.target;
    if (checked) {
      onAnswerChange([...answer, value]);
    } else {
      onAnswerChange(answer.filter((item) => item !== value));
    }
  };

  return (
    <div>
      <h3>{question.text}</h3>
      <div className="CheckboxGroup">
        {question.options.map((option, index) => (
          <label key={index} className="CheckboxLabel">
            <input
              type="checkbox"
              id={`option-${index}`}
              value={option}
              checked={answer.includes(option)}
              onChange={handleCheckboxChange}
            />
            {option}
          </label>
        ))}
      </div>
    </div>
  );
};

export default CheckboxQuestion;
