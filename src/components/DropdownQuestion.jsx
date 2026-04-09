const DropdownQuestion = ({ question, answer, onAnswerChange }) => {
  return (
    <div>
      <h3>{question.text}</h3>
      <select
        className="DropdownSelect"
        value={answer || ""}
        onChange={(e) => onAnswerChange(e.target.value)}
      >
        <option value="" disabled>
          Select an option
        </option>
        {question.options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
};

export default DropdownQuestion;
