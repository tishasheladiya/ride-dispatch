import { Link, useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function CustomerSidebar() {
    const location = useLocation();
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("name");
        navigate("/");
    };

    return (
        <div className="sidebar" style={{ background: 'linear-gradient(180deg, #101828 0%, #1d2939 100%)' }}>
            <h2 className="logo">
                <div className="logo-icon" style={{ background: 'linear-gradient(135deg, #14b8a6, #0f766e)' }}>C</div>
                Customer
            </h2>

            <nav>
                <Link to="/customer/dashboard" className={location.pathname === "/customer/dashboard" ? "active" : ""}>
                    🚘 Book a Ride
                </Link>
                <Link to="/customer/rides" className={location.pathname === "/customer/rides" ? "active" : ""}>
                    📋 My Rides
                </Link>
                <Link to="/customer/profile" className={location.pathname === "/customer/profile" ? "active" : ""}>
                    👤 Profile
                </Link>
            </nav>

            <button className="sidebar-logout" onClick={handleLogout}>
                ⏻ Logout
            </button>
        </div>
    );
}

export default CustomerSidebar;
