import { useEffect, useState } from "react";
import axios from "axios";
import CustomerSidebar from "../components/CustomerSidebar";
import CustomerNavbar from "../components/CustomerNavbar";
import "./Dashboard.css"; // Reuse styling container classes

const CustomerRides = () => {
    const [pastRides, setPastRides] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchRides = async () => {
        try {
            const token = localStorage.getItem("token");
            const res = await axios.get("http://localhost:5000/api/customer/rides", {
                headers: { Authorization: `Bearer ${token}` }
            });
            setPastRides(res.data);
        } catch (error) {
            console.error("Failed to load rides", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchRides();
    }, []);

    const formatCarType = (type) => {
        if (type === "mini") return "Mini (Hatchback)";
        if (type === "prime") return "Prime (Sedan)";
        if (type === "suv") return "SUV (6 Seater)";
        return type;
    };

    return (
        <div className="dashboard-container">
            <CustomerSidebar />

            <div className="main-content">
                <CustomerNavbar />

                <div className="content-area">
                    <div className="page-header" style={{ marginBottom: '30px' }}>
                        <h2 style={{ fontSize: '24px', fontWeight: '700', color: 'var(--text-main)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                            My Rides  📋
                        </h2>
                        <p style={{ fontSize: '14px', color: 'var(--text-muted)', marginTop: '5px' }}>
                            View and manage your recent bookings and trip histories.
                        </p>
                    </div>

                    <div className="table-container" style={{ padding: '0px', overflow: 'hidden' }}>
                        <div className="table-header" style={{ padding: '24px 30px', borderBottom: '1px solid var(--border-color)', backgroundColor: 'var(--card-bg)' }}>
                            <h3 style={{ fontSize: '16px', fontWeight: '700', color: 'var(--text-main)' }}>Recent Trips</h3>
                        </div>
                        <table className="modern-table">
                            <thead>
                                <tr>
                                    <th>Booking ID</th>
                                    <th>Date</th>
                                    <th>Pickup</th>
                                    <th>Drop-off</th>
                                    <th>Driver & Car</th>
                                    <th className="center-col">Price</th>
                                    <th className="center-col">Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {loading ? (
                                    <tr>
                                        <td colSpan="7" style={{ textAlign: 'center', padding: '20px' }}>Loading rides...</td>
                                    </tr>
                                ) : pastRides.length === 0 ? (
                                    <tr>
                                        <td colSpan="7" style={{ textAlign: 'center', padding: '20px', color: 'var(--text-muted)' }}>No rides found. Book your first ride!</td>
                                    </tr>
                                ) : pastRides.map((ride) => (
                                    <tr key={ride._id}>
                                        <td style={{ fontWeight: '600', color: 'var(--text-main)' }}>
                                            {ride._id.slice(-6).toUpperCase()}
                                        </td>
                                        <td>{new Date(ride.createdAt).toLocaleDateString()}</td>
                                        <td>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                                <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#14b8a6' }}></div>
                                                {ride.pickupLocation}
                                            </div>
                                        </td>
                                        <td>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                                <div style={{ width: '8px', height: '8px', backgroundColor: '#f43f5e' }}></div>
                                                {ride.dropoffLocation}
                                            </div>
                                        </td>
                                        <td>
                                            <div style={{ fontWeight: '600', color: 'var(--text-main)' }}>
                                                {ride.driverId ? ride.driverId.name : "Waiting for Driver"}
                                            </div>
                                            <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
                                                {formatCarType(ride.rideType)}
                                            </div>
                                        </td>
                                        <td className="center-col" style={{ fontWeight: '700', color: 'var(--text-main)' }}>
                                            ₹ {ride.price}
                                        </td>
                                        <td className="center-col">
                                            <span
                                                className="status-badge"
                                                style={
                                                    ride.status === "Completed" ? { backgroundColor: 'rgba(56, 193, 114, 0.1)', color: '#38c172' }
                                                        : ride.status === "Pending" ? { backgroundColor: 'var(--bg-main)', color: '#f59e0b' }
                                                            : ride.status === "Accepted" ? { backgroundColor: 'rgba(99, 122, 255, 0.1)', color: '#637aff' }
                                                                : { backgroundColor: 'rgba(248, 91, 91, 0.1)', color: '#f85b5b' }
                                                }
                                            >
                                                {ride.status}
                                            </span>
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

export default CustomerRides;
