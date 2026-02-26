import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./AdminLogin.css"; // Reuse login styles

function CustomerLogin() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const res = await axios.post("http://localhost:5000/api/auth/login", {
                email,
                password,
            });

            if (res.data.role !== "CUSTOMER" && res.data.role !== "ADMIN") {
                alert("Access denied. Customer only.");
                return;
            }

            localStorage.setItem("token", res.data.token);
            localStorage.setItem("name", res.data.name);
            localStorage.setItem("role", res.data.role);
            navigate("/customer/dashboard");
        } catch (error) {
            alert("Invalid Credentials");
        }
    };

    return (
        <div className="login-container" style={{ background: '#f0fdfa' }}>
            <div className="login-card" style={{ boxShadow: '0 20px 40px rgba(13, 148, 136, 0.1)' }}>
                <h2 className="login-title" style={{ color: '#0f766e' }}>Customer Panel</h2>
                <p style={{ textAlign: 'center', color: '#64748b', fontSize: '13px', marginBottom: '20px' }}>Book your ride in seconds.</p>

                <form onSubmit={handleLogin}>
                    <div className="input-group">
                        <label>Email</label>
                        <input
                            type="email"
                            placeholder="Enter your email"
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>

                    <div className="input-group">
                        <label>Password</label>
                        <div className="password-wrapper">
                            <input
                                type={showPassword ? "text" : "password"}
                                placeholder="Enter your password"
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                            <span
                                className="toggle-password"
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                {showPassword ? "Hide" : "Show"}
                            </span>
                        </div>
                    </div>

                    <button className="login-btn" type="submit" style={{ background: 'linear-gradient(135deg, #0f766e, #14b8a6)' }}>
                        Login as Customer
                    </button>
                </form>
            </div>
        </div>
    );
}

export default CustomerLogin;
