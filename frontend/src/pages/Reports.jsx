import { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import "./Dashboard.css"; // Reuse existing styles

import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts';

const Reports = () => {
    const [users, setUsers] = useState([]);
    const [stats, setStats] = useState({
        totalUsers: 0,
        totalDrivers: 0,
        totalCustomers: 0,
        blockedUsers: 0,
    });

    const fetchData = async () => {
        try {
            const token = localStorage.getItem("token");

            const resUsers = await axios.get("http://localhost:5000/api/admin/users", {
                headers: { Authorization: `Bearer ${token}` },
            });
            setUsers(resUsers.data);

            const resStats = await axios.get("http://localhost:5000/api/admin/stats", {
                headers: { Authorization: `Bearer ${token}` },
            });
            setStats(resStats.data);

        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    // Calculate percentages safely
    const calculatePercentage = (value, total) => {
        return total > 0 ? Math.round((value / total) * 100) : 0;
    };

    const driverPct = calculatePercentage(stats.totalDrivers, stats.totalUsers);
    const customerPct = calculatePercentage(stats.totalCustomers, stats.totalUsers);
    const blockedPct = calculatePercentage(stats.blockedUsers, stats.totalUsers);

    const adminCount = stats.totalUsers - stats.totalDrivers - stats.totalCustomers;

    const pieData = [
        { name: 'Drivers', value: stats.totalDrivers > 0 ? stats.totalDrivers : 1, actualValue: stats.totalDrivers, color: '#38c172' },
        { name: 'Customers', value: stats.totalCustomers > 0 ? stats.totalCustomers : 1, actualValue: stats.totalCustomers, color: '#637aff' },
        { name: 'Admins', value: adminCount > 0 ? adminCount : 1, actualValue: adminCount, color: '#f85b5b' }
    ];

    return (
        <div className="dashboard-container">
            <Sidebar />

            <div className="main-content">
                <Navbar />

                <div className="content-area">
                    <div className="page-header">
                        <h2 style={{ fontSize: '20px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                            System Reports 📊
                        </h2>
                        <p style={{ fontSize: '14px', color: 'var(--text-muted)', marginTop: '5px' }}>
                            Detailed analytics based on user and driver distributions.
                        </p>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '24px' }}>

                        {/* Graphical Breakdown Section */}
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '24px' }}>

                            {/* Graphical Chart */}
                            <div className="table-container" style={{ padding: '30px', display: 'flex', flexDirection: 'column' }}>
                                <h3 style={{ fontSize: '16px', fontWeight: '700', marginBottom: '25px', color: 'var(--text-main)' }}>User Distribution Chart</h3>
                                <div style={{ width: '100%', height: '250px' }}>
                                    <ResponsiveContainer width="100%" height="100%">
                                        <PieChart>
                                            <Pie
                                                data={pieData}
                                                cx="50%"
                                                cy="50%"
                                                innerRadius={60}
                                                outerRadius={90}
                                                paddingAngle={5}
                                                dataKey="value"
                                            >
                                                {pieData.map((entry, index) => (
                                                    <Cell key={`cell-${index}`} fill={entry.color} />
                                                ))}
                                            </Pie>
                                            <Tooltip formatter={(value, name, props) => [props.payload.actualValue, name]} />
                                            <Legend verticalAlign="bottom" height={36} />
                                        </PieChart>
                                    </ResponsiveContainer>
                                </div>
                            </div>

                            <div className="table-container" style={{ padding: '30px' }}>
                                <h3 style={{ fontSize: '16px', fontWeight: '700', marginBottom: '25px', color: 'var(--text-main)' }}>Platform Demographics</h3>

                                {/* Drivers Bar */}
                                <div style={{ marginBottom: '20px' }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                                        <span style={{ fontSize: '13px', fontWeight: '600', color: 'var(--text-main)' }}>Drivers</span>
                                        <span style={{ fontSize: '13px', fontWeight: '600', color: '#38c172' }}>{driverPct}% / {stats.totalDrivers} </span>
                                    </div>
                                    <div style={{ width: '100%', height: '8px', backgroundColor: 'var(--border-color)', borderRadius: '10px', overflow: 'hidden' }}>
                                        <div style={{ width: `${driverPct}%`, height: '100%', backgroundColor: '#38c172', borderRadius: '10px' }}></div>
                                    </div>
                                </div>

                                {/* Customers Bar */}
                                <div style={{ marginBottom: '20px' }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                                        <span style={{ fontSize: '13px', fontWeight: '600', color: 'var(--text-main)' }}>Customers</span>
                                        <span style={{ fontSize: '13px', fontWeight: '600', color: '#637aff' }}>{customerPct}% / {stats.totalCustomers}</span>
                                    </div>
                                    <div style={{ width: '100%', height: '8px', backgroundColor: 'var(--border-color)', borderRadius: '10px', overflow: 'hidden' }}>
                                        <div style={{ width: `${customerPct}%`, height: '100%', backgroundColor: '#637aff', borderRadius: '10px' }}></div>
                                    </div>
                                </div>

                                {/* Blocked Users */}
                                <div style={{ marginBottom: '20px' }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                                        <span style={{ fontSize: '13px', fontWeight: '600', color: 'var(--text-main)' }}>Blocked Accounts</span>
                                        <span style={{ fontSize: '13px', fontWeight: '600', color: '#f85b5b' }}>{blockedPct}% / {stats.blockedUsers}</span>
                                    </div>
                                    <div style={{ width: '100%', height: '8px', backgroundColor: 'var(--border-color)', borderRadius: '10px', overflow: 'hidden' }}>
                                        <div style={{ width: `${blockedPct}%`, height: '100%', backgroundColor: '#f85b5b', borderRadius: '10px' }}></div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Recent Activity Table (Mocked layout for report representation) */}
                        <div className="table-container" style={{ padding: '30px' }}>
                            <h3 style={{ fontSize: '16px', fontWeight: '700', marginBottom: '15px', color: 'var(--text-main)' }}>Driver Registration Report</h3>
                            <table className="modern-table">
                                <thead>
                                    <tr>
                                        <th>Driver Name ▾</th>
                                        <th>Email ID</th>
                                        <th className="center-col">Status</th>
                                        <th className="center-col">Platform Join Date</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {users.filter(u => u.role === "DRIVER").map(driver => (
                                        <tr key={driver._id}>
                                            <td className="name-td" style={{ fontWeight: '600', color: 'var(--text-main)' }}>
                                                <div style={{ width: '10px', height: '10px', backgroundColor: driver.isBlocked ? '#f85b5b' : '#38c172', borderRadius: '50%', marginRight: '8px' }}></div>
                                                {driver.name}
                                            </td>
                                            <td>{driver.email}</td>
                                            <td className="center-col">
                                                {driver.isBlocked ? <span style={{ color: '#f85b5b', fontWeight: '600', fontSize: '12px' }}>Inactive</span> : <span style={{ color: '#38c172', fontWeight: '600', fontSize: '12px' }}>Active</span>}
                                            </td>
                                            <td className="center-col">{new Date(driver.createdAt).toLocaleDateString()}</td>
                                        </tr>
                                    ))}
                                    {users.filter(u => u.role === "DRIVER").length === 0 && (
                                        <tr>
                                            <td colSpan="4" style={{ textAlign: 'center', padding: '20px', color: 'var(--text-muted)' }}>No drivers found in the system.</td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>

                    </div>

                </div>
            </div>
        </div>
    );
};

export default Reports;
