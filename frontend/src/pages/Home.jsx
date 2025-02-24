import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthContext } from "../context/AuthContext";

function Home() {
  const { authtoken, role } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleStartQuiz = () => {
    if (authtoken) {
      if (role === "admin") {
        navigate("/admin-dashboard"); 
      } else {
        navigate("/quiz"); 
      }
    } else {
      toast("Login to continue");
      setTimeout(() => navigate("/login"), 1000); 
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#1D1A5F]">
      <div className="text-center bg-[#B6A9E9] p-10 rounded-2xl shadow-xl">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          Welcome to the Quiz App
        </h1>
        <p className="text-gray-600 mb-6">
          Test your knowledge with exciting quizzes!
        </p>

        <button
          onClick={handleStartQuiz}
          className="bg-[#1C8CF8] text-black px-6 py-3 rounded-lg text-lg font-semibold hover:bg-blue-600 transition-all"
        >
          {role ? (role === "admin" ? "Go to Admin Dashboard" : "Start Quiz") : "Start Quiz"}
        </button>
      </div>

      <ToastContainer />
    </div>
  );
}

export default Home;
