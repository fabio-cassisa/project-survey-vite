const RangeSliderQuestion = ({ question, answer, onAnswerChange }) => {
  const value = answer || 5;

  return (
    <div>
      <h3>{question.text}</h3>
      <div className="RangeSliderContainer">
        <div className="RangeValue">{value}</div>
        <input
          type="range"
          min={1}
          max={10}
          step={1}
          value={value}
          onChange={(e) => onAnswerChange(Number(e.target.value))}
        />
        <div className="RangeScale">
          <span>1 — Beginner</span>
          <span>10 — Expert</span>
        </div>
      </div>
    </div>
  );
};

export default RangeSliderQuestion;
