import React from "react";
import { CheckCircle, XCircle } from "lucide-react";

const Result = ({ result, answer, showAnswer }) => {
  if (!showAnswer) return null;
 

  return (
    <div
      className={`flex items-center justify-center gap-2 text-lg font-semibold p-4 rounded-lg
        ${result === "correct" ? "text-green-700 bg-green-100" : "text-red-700 bg-red-100"}`}
    >
      {result === "correct" ? (
        <>
          <CheckCircle className="w-6 h-6" />
          <span>Correct!</span>
        </>
      ) : (
        <>
          <XCircle className="w-6 h-6" />
          <span>Incorrect. The correct answer is: {answer}</span>
        </>
      )}
    </div>
  );
};

export default Result;
