import { useContext, useEffect, useState } from "react";
import axios from "axios";
import QuizList from "./QuizList";
import { AuthContext } from "../context/AuthContext";

const Quiz = () => {
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [score, setScore] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  
 
  const { userId } = useContext(AuthContext);

 
  const fetchQuestions = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get("http://localhost:3000/api/getQuestions");
      setQuestions(response.data.data || []);
      setAnswers({});
      setScore(null);
    } catch (error) {
      console.error("Error fetching questions:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchQuestions();
  }, []); 

 
  const handleAnswerChange = (questionId, selectedOption) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: selectedOption,
    }));
  };

  
  const handleSubmitQuiz = async () => {
    if (!userId) {
      alert("User not logged in! Please log in to submit the quiz.");
      return;
    }

    let correctCount = 0;
    questions.forEach((question) => {
      if (answers[question._id] === question.correctAnswer) {
        correctCount += 1;
      }
    });

    setScore(correctCount);
    console.log(userId)
  
    try {
      await axios.post("http://localhost:3000/api/submitQuiz", {
        userId, 
        correctAnswers: correctCount,
      });
      console.log(userId)

      alert(`Quiz Submitted! You got ${correctCount} correct answers.`);
    } catch (error) {
      console.error("Error submitting quiz:", error);
      alert("Failed to submit the quiz. Please try again.");
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h1 className="text-3xl font-bold text-center text-blue-700 mb-6">Quiz Questions</h1>

      {isLoading ? (
        <p className="text-center text-gray-500">Loading questions...</p>
      ) : questions.length === 0 ? (
        <p className="text-center text-gray-500">No questions available.</p>
      ) : (
        questions.map((quiz) => (
          <QuizList key={quiz._id} data={quiz} onAnswerChange={handleAnswerChange} />
        ))
      )}

      {questions.length > 0 && (
        <div className="flex flex-col items-center mt-6 space-y-4">
          <button
            onClick={handleSubmitQuiz}
            className="bg-green-600 text-white px-6 py-2 rounded-md shadow-md hover:bg-green-700 transition duration-200"
          >
            Submit Quiz
          </button>

          {score !== null && (
            <p className="text-lg font-semibold text-blue-800">
              Your Score: {score} / {questions.length}
            </p>
          )}

          <button
            onClick={fetchQuestions}
            className="bg-blue-600 text-white px-6 py-2 rounded-md shadow-md hover:bg-blue-700 transition duration-200"
          >
            Restart Quiz 🔄
          </button>
        </div>
      )}
    </div>
  );
};

export default Quiz;
