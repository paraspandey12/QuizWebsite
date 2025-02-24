import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { IoArrowBack } from "react-icons/io5";
import axios from "axios";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("dashboard");
  const [users, setUsers] = useState([]);
  const [showUsers, setShowUsers] = useState(false);

  const handleShowUsers = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/getUser");
      console.log(response.data)
      setUsers(response.data.user); 
      setShowUsers(true);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };


  const handleMakeAdmin = async (email) => {
    try {
      await axios.post("http://localhost:3000/api/make-admin", { email });

    
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user.email === email ? { ...user, role: "admin" } : user
        )
      );

      alert("User has been made an admin!");
    } catch (error) {
      console.error("Error making user admin:", error);
    }
  };

  const handleRemoveAdmin = async (email) => {
    try {
      await axios.post("http://localhost:3000/api/remove-admin", { email });

      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user.email === email ? { ...user, role: "user" } : user
        )
      );

      alert("Admin rights removed!");
    } catch (error) {
      console.error("Error removing admin rights:", error);
    }
  };

  return (
    <div className="h-screen p-5">
      <button
        onClick={() => navigate("/")}
        className="flex items-center text-blue-500 hover:text-blue-700 mb-4"
      >
        <IoArrowBack className="text-xl mr-2" /> Back to home
      </button>

      <div className="flex gap-10 text-xl border-b-2 p-3">
        <button
          onClick={() => setActiveTab("dashboard")}
          className={`pb-2 ${activeTab === "dashboard" ? "border-b-4 border-[#1D1A5F] font-bold" : ""}`}
        >
          Dashboard
        </button>
        <button
          onClick={() => {
            setActiveTab("createQuiz");
            navigate("/createQuiz");
          }}
          className={`pb-2 ${activeTab === "createQuiz" ? "border-b-4 border-[#1D1A5F] font-bold" : ""}`}
        >
          Create Quiz
        </button>
      </div>

      {activeTab === "dashboard" && (
        <div className="mt-5">
          <h2 className="text-2xl font-bold mb-3">Admin Dashboard</h2>

          <button
            onClick={handleShowUsers}
            className="mt-3 bg-[#1D1A5F] text-white px-4 py-2 rounded hover:bg-blue-600 transition"
          >
            Show Users
          </button>

          {showUsers && (
            <div className="mt-5 border rounded-lg p-4 bg-gray-50 shadow-md">
              <h3 className="text-lg font-semibold mb-2">User List</h3>
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-gray-200">
                    <th className="border p-2">User</th>
                    <th className="border p-2 ">Email</th>
                    <th className="border p-2">Role</th>
                    <th className="border p-2">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user) => (
                    <tr key={user.email} className="text-center">
                      <td className="border p-2">{user.name}</td>
                      <td className="border p-2">{user.email}</td>
                      <td className="border p-2 capitalize">{user.role || "User"}</td>
                      <td className="border p-2">
                        {user.role === "admin" ? (
                          <button
                            onClick={() => handleRemoveAdmin(user.email)}
                            className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
                          >
                            Remove Admin
                          </button>
                        ) : (
                          <button
                            onClick={() => handleMakeAdmin(user.email)}
                            className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 transition"
                          >
                            Make Admin
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
