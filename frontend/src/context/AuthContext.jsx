import { createContext, useState, useEffect } from "react";
import axios from "axios";
import cookies from "js-cookie";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [authtoken, setAuthtoken] = useState(cookies.get("token"));
  const [role, setRole] = useState(null);
  const [userId, setUserId] = useState(null);

  const fetchUserRole = async () => {
    try {
      const token = cookies.get("token");
      if (!token) {
        setRole(null);
        return;
      }
      const response = await axios.get("http://localhost:3000/api/getrole", {
        headers: { Authorization: `Bearer ${token}` },
        withCredentials: true,
      });
      setRole(response.data.role);
    } catch (error) {
      console.error("Error fetching role:", error);
      setRole(null);
    }
  };
  const fetchUserId = async () => {
    try {
      const token = cookies.get("token");
      if (!token) {
        setUserId(null)
        return;
      }
      const response = await axios.get("http://localhost:3000/api/getuserId", {
        headers: { Authorization: `Bearer ${token}` },
        withCredentials: true,
      });
      console.log(response.data)
      setUserId(response.data);
    } catch (error) {
      console.error("Error fetching role:", error);
      setRole(null);
    }
  };


  useEffect(() => {
    if (authtoken) {
      fetchUserRole();
      fetchUserId()
    }
  }, [authtoken]);

  const login = (token) => {
    setAuthtoken(token);
    cookies.set("token", token, { expires: 7 });
    setTimeout(() => {
      fetchUserRole();
    }, 100);
  };

  const logout = () => {
    setAuthtoken(null);
    setRole(null);
    cookies.remove("token");
  };

  return (
    <AuthContext.Provider value={{ authtoken, role, login, logout , userId}}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
