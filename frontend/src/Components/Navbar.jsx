import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";

const Navbar = () => {
  const { authtoken, logout } = useContext(AuthContext);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();


  useEffect(() => {
    const fetchUserDetails = async () => {
      if (authtoken) {
        try {
          const response = await axios.get("http://localhost:3000/api/getCurrentUser", {
            withCredentials: true,
          });
          setUser(response.data.user);
        } catch (error) {
          console.error("Error fetching user:", error);
        }
      }
    };
    fetchUserDetails();
  }, [authtoken]);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div className="flex gap-12 sm:justify-between items-center bg-[#B6A9E9] w-screen h-20 md:h-24 px-6">
      
      <div className="flex items-center gap-3">
        <Link to="/">
          <img className="h-18" src="8586938.png" alt="logo" />
        </Link>
        <h1 className="font-bold text-2xl md:text-3xl mt-5">Quizz</h1>
      </div>

    
      {authtoken ? (
        <div className="flex items-center gap-2 sm:gap-4">
          <span className="text-lg  font-medium">
           {user ? user.name : "User"}
          </span>
          <button
            onClick={handleLogout}
            className="rounded p-2 font-medium px-3 sm:mr-8 text-white bg-[#1D1A5F] hover:bg-[#699BF1]"
          >
            Logout
          </button>
        </div>
      ) : (
        <div className="flex gap-3">
          <Link
            to="/login"
            className="rounded p-2 font-medium px-3 text-white bg-[#1D1A5F] hover:bg-[#699BF1]"
          >
            Login
          </Link>
          <Link
            to="/register"
            className="rounded p-2 font-medium px-3 text-white bg-[#1D1A5F] hover:bg-[#699BF1]"
          >
            SignUp
          </Link>
        </div>
      )}
    </div>
  );
};

export default Navbar;
