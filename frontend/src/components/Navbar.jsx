import { useNavigate, Link } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("name"); // Also clearing name
    navigate("/");
  };

  let userName = localStorage.getItem("name");
  if (!userName || userName === "undefined") {
    userName = "User";
  }

  const userInitial = userName.charAt(0).toUpperCase();

  return (
    <div className="navbar">
      <div className="nav-left">
        <h3 style={{ fontSize: '18px', fontWeight: '600', color: 'var(--text-main)', margin: 0 }}>
          Welcome, Admin {userName}.
        </h3>
      </div>

      <div className="nav-right">
        <div className="nav-profile">{userInitial}</div>
        <button onClick={handleLogout} className="logout-btn">
          Logout
        </button>
      </div>
    </div>
  );
}

export default Navbar;