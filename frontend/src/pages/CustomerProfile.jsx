import { useState } from "react";
import CustomerSidebar from "../components/CustomerSidebar";
import CustomerNavbar from "../components/CustomerNavbar";
import "./Dashboard.css"; // Reuse styling container classes

const CustomerProfile = () => {
    const [userName, setUserName] = useState(localStorage.getItem("name") || "Customer");
    const [email] = useState("customer@example.com"); // Mock email for now since it is not saved to localStorage currently
    const [phone, setPhone] = useState("+91 98765 43210");
    const userInitial = userName.charAt(0).toUpperCase();

    const handleSave = (e) => {
        e.preventDefault();
        alert("Profile details updated successfully!");
        localStorage.setItem("name", userName); // Update it if they change their name
    };

    return (
        <div className="dashboard-container">
            <CustomerSidebar />

            <div className="main-content">
                <CustomerNavbar />

                <div className="content-area">
                    <div className="page-header" style={{ marginBottom: '30px' }}>
                        <h2 style={{ fontSize: '24px', fontWeight: '700', color: 'var(--text-main)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                            Profile Settings 👤
                        </h2>
                        <p style={{ fontSize: '14px', color: 'var(--text-muted)', marginTop: '5px' }}>
                            Manage your personal information and account settings.
                        </p>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'minmax(300px, 1fr) 2fr', gap: '24px', alignItems: 'start' }}>

                        {/* Profile Summary Card */}
                        <div className="table-container" style={{ padding: '30px', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                            <div style={{ width: '80px', height: '80px', borderRadius: '50%', backgroundColor: '#ccfbf1', color: '#0f766e', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '32px', fontWeight: 'bold', marginBottom: '15px' }}>
                                {userInitial}
                            </div>
                            <h3 style={{ fontSize: '20px', fontWeight: '700', color: 'var(--text-main)', marginBottom: '5px' }}>{userName}</h3>
                            <p style={{ fontSize: '14px', color: 'var(--text-muted)', marginBottom: '20px' }}>Premium Rider</p>

                            <div style={{ display: 'flex', gap: '15px', marginTop: '10px' }}>
                                <div style={{ padding: '10px 20px', backgroundColor: 'var(--bg-main)', borderRadius: '8px', border: '1px solid var(--border-color)' }}>
                                    <div style={{ fontSize: '18px', fontWeight: '700', color: '#0f766e' }}>14</div>
                                    <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Total Rides</div>
                                </div>
                                <div style={{ padding: '10px 20px', backgroundColor: 'var(--bg-main)', borderRadius: '8px', border: '1px solid var(--border-color)' }}>
                                    <div style={{ fontSize: '18px', fontWeight: '700', color: '#f59e0b' }}>4.8</div>
                                    <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Rating</div>
                                </div>
                            </div>
                        </div>

                        {/* Edit Profile Form */}
                        <div className="table-container" style={{ padding: '30px' }}>
                            <h3 style={{ fontSize: '18px', fontWeight: '700', color: 'var(--text-main)', marginBottom: '24px' }}>Edit Personal Details</h3>

                            <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                                    <div className="input-group">
                                        <label style={{ fontSize: '13px', fontWeight: '600', color: 'var(--text-muted)', marginBottom: '8px', display: 'block' }}>Full Name</label>
                                        <input
                                            type="text"
                                            value={userName}
                                            onChange={(e) => setUserName(e.target.value)}
                                            style={{ width: '100%', padding: '12px 14px', borderRadius: '8px', border: '1px solid #e2e8f0', backgroundColor: '#f8fafc', fontSize: '14px', outline: 'none' }}
                                        />
                                    </div>
                                    <div className="input-group">
                                        <label style={{ fontSize: '13px', fontWeight: '600', color: 'var(--text-muted)', marginBottom: '8px', display: 'block' }}>Email Address</label>
                                        <input
                                            type="email"
                                            value={email}
                                            disabled
                                            style={{ width: '100%', padding: '12px 14px', borderRadius: '8px', border: '1px solid #e2e8f0', backgroundColor: '#e2e8f0', color: '#94a3b8', fontSize: '14px', outline: 'none', cursor: 'not-allowed' }}
                                        />
                                    </div>
                                </div>

                                <div className="input-group">
                                    <label style={{ fontSize: '13px', fontWeight: '600', color: 'var(--text-muted)', marginBottom: '8px', display: 'block' }}>Phone Number</label>
                                    <input
                                        type="text"
                                        value={phone}
                                        onChange={(e) => setPhone(e.target.value)}
                                        style={{ width: '100%', padding: '12px 14px', borderRadius: '8px', border: '1px solid #e2e8f0', backgroundColor: '#f8fafc', fontSize: '14px', outline: 'none' }}
                                    />
                                </div>

                                <div style={{ marginTop: '10px' }}>
                                    <button
                                        type="submit"
                                        style={{ padding: '12px 24px', borderRadius: '8px', background: 'linear-gradient(135deg, #0f766e, #14b8a6)', color: 'white', fontSize: '14px', fontWeight: '600', border: 'none', cursor: 'pointer', boxShadow: '0 4px 10px rgba(20, 184, 166, 0.2)' }}
                                    >
                                        Save Changes
                                    </button>
                                </div>
                            </form>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default CustomerProfile;
