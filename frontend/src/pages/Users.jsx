import { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import "./Dashboard.css"; // Ensure we import the styles

const getAvatarColor = (name) => {
  const char = name.charAt(0).toUpperCase();
  // Assign different colors based on the first letter
  if (['A', 'K', 'S', 'P'].includes(char)) return '#4da3ff'; // light blue
  if (['T', 'R', 'E', 'L'].includes(char)) return '#ff6b8b'; // pinkish red
  if (['K', 'M', 'N', 'D'].includes(char)) return '#36d7b7'; // cyan
  return '#9b59b6'; // defaults to purple
};

const Users = () => {
  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.get(
        "http://localhost:5000/api/admin/users",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setUsers(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const toggleBlock = async (id) => {
    try {
      const token = localStorage.getItem("token");

      await axios.put(
        `http://localhost:5000/api/admin/users/block/${id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      fetchUsers(); // refresh list
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="dashboard-container">
      <Sidebar />

      <div className="main-content">
        <Navbar />

        <div className="content-area">
          <div className="page-header">
            <h2 style={{ fontSize: '20px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              Welcome Admin <span style={{ fontSize: '24px' }}>👋</span>
            </h2>
          </div>

          <div className="table-container">
            <div className="table-header">
              <h3>Users Management</h3>
            </div>
            <table className="modern-table">
              <thead>
                <tr>
                  <th>Name ▾</th>
                  <th>Email</th>
                  <th>Email</th>
                  <th className="center-col">Role</th>
                  <th className="center-col">Status</th>
                  <th className="center-col">Action</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user._id}>
                    <td className="name-td">
                      <div className="avatar" style={{ backgroundColor: getAvatarColor(user.name) }}>
                        {user.name.charAt(0).toUpperCase()}
                      </div>
                      {user.name}
                    </td>
                    <td>{user.email}</td>
                    <td>{user.email}</td> {/* Duplicated email to match the exact picture requirement */}
                    <td className="center-col"><span className="role-text">{user.role}</span></td>
                    <td className="center-col">
                      {user.isBlocked ? (
                        <span className="status-badge blocked">Blocked</span>
                      ) : (
                        <span className="status-badge active">Active</span>
                      )}
                    </td>
                    <td className="center-col">
                      <button
                        className={`action-btn ${user.isBlocked ? 'btn-unblock' : 'btn-block'}`}
                        onClick={() => toggleBlock(user._id)}
                      >
                        {user.isBlocked ? "Unblock" : "Block"}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Users;