import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { IoArrowBack } from "react-icons/io5"; 
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CreateQuiz = () => {
  const [quizQuestions, setQuizQuestions] = useState([]);
  const [questionData, setQuestionData] = useState({
    difficulty: "",
    category: "",
    question: "",
    options: ["", "", "", ""],
    marks: "",
    correctAnswer: "",
  });
  const [editIndex, setEditIndex] = useState(null); 
  const navigate = useNavigate(); 

  const handleChange = (e) => {
    setQuestionData({ ...questionData, [e.target.name]: e.target.value });
  };

  const handleOptionChange = (index, value) => {
    const newOptions = [...questionData.options];
    newOptions[index] = value;
    setQuestionData({ ...questionData, options: newOptions });
  };

  const handleAddOrUpdateQuestion = () => {
    if (
      !questionData.difficulty ||
      !questionData.category ||
      !questionData.question ||
      questionData.options.some((opt) => opt === "") ||
      !questionData.correctAnswer ||
      !questionData.marks
    ) {
      toast.error("All fields are required!");
      return;
    }

    if (!questionData.options.includes(questionData.correctAnswer)) {
      toast.error("Correct answer must be one of the options!");
      return;
    }

    if (editIndex !== null) {
      const updatedQuestions = [...quizQuestions];
      updatedQuestions[editIndex] = questionData;
      setQuizQuestions(updatedQuestions);
      setEditIndex(null);
      toast.success("Question updated!");
    } else {
      setQuizQuestions([...quizQuestions, questionData]);
      toast.success("Question added!");
    }

    setQuestionData({
      difficulty: "",
      category: "",
      question: "",
      options: ["", "", "", ""],
      marks: "",
      correctAnswer: "",
    });
  };

  const handleEditQuestion = (index) => {
    setQuestionData(quizQuestions[index]);
    setEditIndex(index);
  };

  const handleDeleteQuestion = (index) => {
    const filteredQuestions = quizQuestions.filter((_, i) => i !== index);
    setQuizQuestions(filteredQuestions);
    toast.info("Question deleted!");
  };

  const handleSubmitQuiz = async (e) => {
    e.preventDefault();

    if (quizQuestions.length === 0) {
      toast.error("Please add at least one question before submitting!");
      return;
    }

    try {
      const response = await axios.post("http://localhost:3000/api/createQuiz", {
        questions: quizQuestions,
      });

      toast.success("Quiz Created Successfully!");
      console.log(response.data);

      setQuizQuestions([]); 
    } catch (error) {
      console.error("Error creating quiz:", error);
      toast.error("Failed to create quiz.");
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
      
      <button
        onClick={() => navigate("/admin-dashboard")}
        className="flex items-center text-blue-500 hover:text-blue-700 mb-4"
      >
        <IoArrowBack className="text-xl mr-2" /> Back to Dashboard
      </button>

      <h2 className="text-2xl font-bold mb-4 text-center">Create Quiz</h2>
      <form className="space-y-4">
        <select
          name="category"
          value={questionData.category}
          onChange={handleChange}
          className="w-full p-2 border rounded bg-gray-100"
          required
        >
          <option value="">Select Category</option>
          <option value="Science">Science</option>
          <option value="Math">Math</option>
          <option value="History">History</option>
          <option value="Geography">Geography</option>
          <option value="Coding">Coding</option>
        </select>

        <select
          name="difficulty"
          value={questionData.difficulty}
          onChange={handleChange}
          className="w-full p-2 border rounded bg-gray-100"
          required
        >
          <option value="">Select Difficulty</option>
          <option value="Easy">Easy</option>
          <option value="Medium">Medium</option>
          <option value="Hard">Hard</option>
        </select>

        <textarea
          name="question"
          placeholder="Enter the question"
          value={questionData.question}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />

        {questionData.options.map((option, index) => (
          <input
            key={index}
            type="text"
            placeholder={`Option ${index + 1}`}
            value={option}
            onChange={(e) => handleOptionChange(index, e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
        ))}

        <input
          type="text"
          name="correctAnswer"
          placeholder="Correct Answer"
          value={questionData.correctAnswer}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />

        <input
          type="number"
          name="marks"
          placeholder="Marks"
          value={questionData.marks}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />

        <button
          type="button"
          onClick={handleAddOrUpdateQuestion}
          className="w-full bg-[#B6A9E9] text-white p-2 rounded hover:bg-purple-500 transition"
        >
          {editIndex !== null ? "Update Question" : "Add Question"}
        </button>
      </form>

      {quizQuestions.length > 0 && (
        <div className="mt-5">
          <h3 className="text-lg font-semibold mb-3">Added Questions:</h3>
          <ul className="list-disc pl-5">
            {quizQuestions.map((q, index) => (
              <li key={index} className="mb-2 flex justify-between items-center">
                <div>
                  {index + 1}. {q.question} ({q.difficulty}, {q.category}, {q.marks} Marks)
                </div>
                <div>
                  <button
                    onClick={() => handleEditQuestion(index)}
                    className="bg-blue-500 text-white px-3 py-1 rounded mr-2"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteQuestion(index)}
                    className="bg-red-500 text-white px-3 py-1 rounded"
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>

          <button
            onClick={handleSubmitQuiz}
            className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition mt-4"
          >
            Submit Quiz
          </button>
        </div>
      )}

      <ToastContainer />
    </div>
  );
};

export default CreateQuiz;
