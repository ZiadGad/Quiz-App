import React, { useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useQuizData } from "../Hooks/useQuizData";
import Question from "./Question";
import Result from "./Result";
import Button from "./Button";

const Quiz = () => {
  const { quizData, loading, error } = useQuizData();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState("");
  const [result, setResult] = useState("");
  const [score, setScore] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [answers, setAnswers] = useState(null);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  const handleCheckAnswer = () => {
    const isCorrect = userAnswer === quizData[currentQuestionIndex]?.answer;
    setResult(isCorrect ? "correct" : "wrong");
    if (isCorrect) {
      setScore(score + 1);
    }
    setShowAnswer(true);

 
    const newAnswers = [...answers];
    newAnswers[currentQuestionIndex] = userAnswer;
    setAnswers(newAnswers);
  };

  const handlePrevQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
      setUserAnswer(answers[currentQuestionIndex - 1]);
      setResult("");
      setShowAnswer(false);
    }
  };

  const handleNextQuestion = () => {
    setUserAnswer("");
    setResult("");
    setShowAnswer(false);
    if (currentQuestionIndex < quizData.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setUserAnswer(answers[currentQuestionIndex + 1]);
    } else {
      if (window.confirm(`Quiz completed! Your score is ${score}/${quizData.length}. Would you like to restart?`)) {
        setCurrentQuestionIndex(0);
        setScore(0);
        setAnswers(new Array(10).fill(""));
      }
    }
  };

  const progress = ((currentQuestionIndex + 1) / quizData.length) * 100;
 
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex items-center justify-center p-4">
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-xl p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-center text-gray-800 mb-4">
            Multiple Intelligence Quiz
          </h1>
          <div className="flex justify-between items-center mb-4">
            <span className="text-sm font-medium text-gray-600">
              Question {currentQuestionIndex + 1} of {quizData.length}
            </span>
            <span className="px-4 py-1 bg-blue-100 text-blue-800 rounded-full font-semibold">
              Score: {score}/{quizData.length}
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>

        <div className="space-y-6">
          <Question
            question={quizData[currentQuestionIndex]?.question}
            choices={quizData[currentQuestionIndex]?.choices}
            userAnswer={userAnswer}
            setUserAnswer={setUserAnswer}
          />

          <Result result={result} answer={quizData[currentQuestionIndex]?.answer} showAnswer={showAnswer} />

          <div className="flex gap-3 pt-4">
            <Button
              onClick={handlePrevQuestion}
              disabled={currentQuestionIndex === 0}
              text="Previous"
              icon={<ArrowLeft className="w-4 h-4" />}
            />
            {!showAnswer ? (
              <Button
                onClick={handleCheckAnswer}
                disabled={!userAnswer}
                text="Check Answer"
              />
            ) : (
              <Button
                onClick={handleNextQuestion}
                text={currentQuestionIndex === quizData.length - 1 ? "Finish Quiz" : "Next Question"}
                icon={<ArrowRight className="w-4 h-4" />}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Quiz;
