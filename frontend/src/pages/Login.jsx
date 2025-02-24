import { useContext, useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthContext } from "../context/AuthContext";
import { HiEye, HiEyeOff } from "react-icons/hi";
import { useNavigate } from "react-router-dom";
import { IoArrowBack } from "react-icons/io5";
const Login = () => {
  const [formdata, setFormData] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const handleChange = (e) => {
    setFormData({ ...formdata, [e.target.name]: e.target.value });
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3000/api/login",
        formdata
      );
      login(response.data.token, response.data.role);
      setFormData({
        email: "",
        password: "",
      });
      toast.success("Login successful");
      navigate("/");
    } catch (error) {
      if (error.response) {
        toast.error(error.response.data.message || "Invalid credentials");
      } else {
        toast.error("Login unsuccessful. Please try again later.");
      }
    }
  };

  return (
    <div className=" min-h-screen bg-[#1D1A5F] dark:bg-gray-900">
      <button
        onClick={() => navigate("/")}
        className="flex items-center text-blue-500 hover:text-blue-700 mb-4"
      >
        <IoArrowBack className="text-xl mr-2" /> Back to home
      </button>

      <div className="flex items-center justify-center">
        <div className="w-full max-w-md bg-[#B6A9E9] dark:bg-gray-800 rounded-2xl shadow-lg p-6">
          <h2 className="text-2xl font-bold text-center text-gray-900 dark:text-white">
            Login
          </h2>
          <form className="mt-6" onSubmit={handleSubmit}>
            <div>
              <label className="block text-gray-700 dark:text-gray-300">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formdata.email}
                className="w-full mt-1 p-2 border rounded-lg dark:bg-gray-700 dark:text-white"
                placeholder="Enter your email"
                onChange={handleChange}
                required
              />
            </div>
            <div className="mt-4 relative">
              <label className="block text-gray-700">Password</label>
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formdata.password}
                className="w-full mt-1 p-2 border rounded-lg dark:bg-gray-700 dark:text-white"
                placeholder="Enter your password"
                onChange={handleChange}
                required
              />
              <button
                type="button"
                className="absolute top-9 right-3 text-gray-600 dark:text-gray-400"
                onClick={togglePasswordVisibility}
              >
                {showPassword ? <HiEyeOff size={20} /> : <HiEye size={20} />}
              </button>
            </div>
            <button
              type="submit"
              className="w-full mt-6 bg-[#1D1A5F]  text-white font-bold py-2 px-4 rounded-lg transition-all"
            >
              Login
            </button>
          </form>
          <p className="mt-4 text-sm text-gray-600 dark:text-gray-400 text-center">
            Don't have an account?{" "}
            <a href="#" className="text-[#1D1A5F] font-bold hover:underline">
              Sign Up
            </a>
          </p>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Login;
