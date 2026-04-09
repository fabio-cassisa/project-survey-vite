const Progress = ({ current, total }) => {
  const progressPercentage = (current / total) * 100;

  return (
    <div className="ProgressContainer">
      <div className="ProgressTrack">
        <div
          className="ProgressFill"
          style={{ width: `${progressPercentage}%` }}
        />
      </div>
      <p className="ProgressLabel">
        {current}/{total} questions answered
      </p>
    </div>
  );
};

export default Progress;
