import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import LiveMap from "../components/LiveMap";
import "./Dashboard.css";

import { useEffect, useState } from "react";
import axios from "axios";

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalDrivers: 0,
    totalCustomers: 0,
    blockedUsers: 0
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const token = localStorage.getItem("token");

        // Use the /stats endpoint to get the right dataset
        const res = await axios.get(
          "http://localhost:5000/api/admin/stats",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setStats(res.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchStats();
  }, []);

  return (
    <div className="dashboard-container">
      <Sidebar />

      <div className="main-content">
        <Navbar />

        <div className="content-area">
          <div className="page-header">
            <h2>System Dashboard</h2>
            <p>Overview of the ride-dispatch system and real-time statistics.</p>
          </div>

          <div className="cards">
            <div className="card">
              <span className="card-title">Total Users</span>
              <span className="card-value">{stats.totalUsers}</span>
            </div>

            <div className="card">
              <span className="card-title">Total Drivers</span>
              <span className="card-value">{stats.totalDrivers}</span>
            </div>

            <div className="card">
              <span className="card-title">Total Customers</span>
              <span className="card-value">{stats.totalCustomers}</span>
            </div>

            <div className="card">
              <span className="card-title">Blocked Users</span>
              <span className="card-value" style={{ color: '#ef4444' }}>{stats.blockedUsers}</span>
            </div>
          </div>

          <div className="table-container" style={{ padding: '24px', marginTop: '10px' }}>
            <div className="table-header" style={{ marginBottom: '15px' }}>
              <h3 style={{ fontSize: '18px', fontWeight: '700', color: 'var(--text-main)' }}>Live Map & Dispatch Hub</h3>
              <p style={{ fontSize: '13px', color: 'var(--text-muted)' }}>Real-time vehicle tracking and driver activity map.</p>
            </div>

            <LiveMap />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;