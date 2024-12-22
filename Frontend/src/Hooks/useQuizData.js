import { useState, useEffect } from "react";

export const useQuizData = () => {
  const [quizData, setQuizData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchQuizData = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/v1/questions"); // Replace with your API URL
        if (!response.ok) {
          throw new Error("Failed to fetch quiz data");
        }
        const data = await response.json();
        setQuizData(data.data.questions);
   
      } catch (err) {
        setError("There was an error loading the quiz.");
      } finally {
        setLoading(false);
      }
    };
    fetchQuizData();
  }, []);

  return { quizData, loading, error };
};
