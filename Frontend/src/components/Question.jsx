import React from "react";
import PropTypes from "prop-types";

const Question = ({
  question,
  choices = [],
  userAnswer,
  setUserAnswer,
  showAnswer = false,
  correctAnswer,
}) => {
  if (!choices.length) {
    return (
      <div className="text-lg font-medium text-gray-800 bg-yellow-50 p-4 rounded-lg">
        No choices available for this question.
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Question */}
      <div className="text-lg font-medium text-gray-800 bg-blue-50 p-4 rounded-lg">
        {question}
      </div>

      <div className="space-y-3">
        {choices.map((choice, index) => {
          const choiceLetter = choice.charAt(0); // Assuming the answer choices start with a letter (A, B, C, etc.)

          const isSelected = userAnswer === choiceLetter;
          const isCorrect = correctAnswer === choiceLetter;

          // Conditional classes based on user interaction and showAnswer
          const choiceClassNames = [
            "flex items-center p-4 rounded-lg cursor-pointer transition-all duration-200",
            isSelected
              ? "bg-blue-100 border-2 border-blue-300 shadow-md transform scale-[1.02]"
              : "bg-white hover:bg-blue-50 hover:border-blue-200 hover:shadow-md hover:scale-[1.01] border border-gray-200",
            showAnswer && isCorrect
              ? "ring-2 ring-green-500 bg-green-50"
              : "",
            showAnswer && isSelected && !isCorrect
              ? "ring-2 ring-red-500 bg-red-50"
              : "",
            showAnswer ? "cursor-not-allowed" : "hover:border-blue-300",
          ]
            .filter(Boolean)
            .join(" ");

          return (
            <label key={index} className={choiceClassNames}>
              <input
                type="radio"
                name="answer"
                value={choiceLetter}
                checked={isSelected}
                onChange={() => {
                  if (!showAnswer) {
                    setUserAnswer(isSelected ? "" : choiceLetter);
                  }
                }}
                disabled={showAnswer}
                className="w-4 h-4 text-blue-600 focus:ring-blue-500 cursor-pointer disabled:cursor-not-allowed"
              />
              <span className="ml-3 text-gray-800 flex-1 font-medium">
                {choice}
              </span>
            </label>
          );
        })}
      </div>
    </div>
  );
};

 

export default Question;
