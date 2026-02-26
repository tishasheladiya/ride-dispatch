import { Link, useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function Sidebar() {
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div className="sidebar">
      <h2 className="logo">
        <div className="logo-icon">A</div>
        Admin
      </h2>

      <nav>
        <Link to="/dashboard" className={location.pathname === "/dashboard" ? "active" : ""}>
          🏠 Dashboard
        </Link>
        <Link to="/users" className={location.pathname === "/users" ? "active" : ""}>
          👥 Users
        </Link>
        <Link to="/reports" className={location.pathname === "/reports" ? "active" : ""}>
          📊 Reports
        </Link>
      </nav>

      <button className="sidebar-logout" onClick={handleLogout}>
        ⏻ Logout
      </button>
    </div>
  );
}

export default Sidebar;