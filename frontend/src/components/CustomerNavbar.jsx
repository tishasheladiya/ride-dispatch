import { useNavigate } from "react-router-dom";

function CustomerNavbar() {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("name"); // Also clearing name
        navigate("/");
    };

    let userName = localStorage.getItem("name");
    if (!userName || userName === "undefined") {
        userName = "Customer";
    }

    const userInitial = userName.charAt(0).toUpperCase();

    return (
        <div className="navbar">
            <div className="nav-left">
                <h3 style={{ fontSize: '18px', fontWeight: '600', color: 'var(--text-main)', margin: 0 }}>
                    Welcome, {userName} 👋
                </h3>
            </div>

            <div className="nav-right">
                <div className="nav-profile" style={{ backgroundColor: '#ccfbf1', color: '#0f766e' }}>{userInitial}</div>
                <button onClick={handleLogout} className="logout-btn" style={{ background: '#f43f5e', boxShadow: '0 4px 6px rgba(244, 63, 94, 0.2)' }}>
                    Logout
                </button>
            </div>
        </div>
    );
}

export default CustomerNavbar;
