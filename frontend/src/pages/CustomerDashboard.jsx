import { useState } from "react";
import axios from "axios";
import CustomerSidebar from "../components/CustomerSidebar";
import CustomerNavbar from "../components/CustomerNavbar";
import LiveMap from "../components/LiveMap";
import "./Dashboard.css"; // Reuse existing styles

const CustomerDashboard = () => {
    const [pickup, setPickup] = useState("");
    const [dropoff, setDropoff] = useState("");
    const [selectedRide, setSelectedRide] = useState(null);

    const rideOptions = [
        { id: 'mini', name: 'Mini (Hatchback)', price: '₹ 150', time: '5 mins away', icon: '🚗' },
        { id: 'prime', name: 'Prime (Sedan)', price: '₹ 220', time: '8 mins away', icon: '🚙' },
        { id: 'suv', name: 'SUV (6 Seater)', price: '₹ 350', time: '12 mins away', icon: '🚐' }
    ];

    const handleBooking = async () => {
        if (!pickup || !dropoff) {
            alert("Please enter both Pickup and Drop-off locations.");
            return;
        }
        if (!selectedRide) {
            alert("Please select a ride type.");
            return;
        }

        const rideData = rideOptions.find(r => r.id === selectedRide);

        try {
            const token = localStorage.getItem("token");
            await axios.post("http://localhost:5000/api/customer/ride", {
                pickupLocation: pickup,
                dropoffLocation: dropoff,
                rideType: rideData.id,
                price: parseInt(rideData.price.replace(/\D/g, '')), // Extract number from ₹ 150
            }, {
                headers: { Authorization: `Bearer ${token}` }
            });

            alert(`Ride booked successfully from ${pickup} to ${dropoff} with ${rideData.name}!`);

            // Clear inputs after success
            setPickup("");
            setDropoff("");
            setSelectedRide(null);

        } catch (error) {
            alert("Failed to request ride. Please try again.");
            console.error(error);
        }
    };

    return (
        <div className="dashboard-container">
            <CustomerSidebar />

            <div className="main-content">
                <CustomerNavbar />

                <div className="content-area">
                    <div className="page-header" style={{ marginBottom: '20px' }}>
                        <h2 style={{ fontSize: '24px', fontWeight: '700', color: 'var(--text-main)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                            Where to today? 🗺️
                        </h2>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'minmax(350px, 1fr) 2fr', gap: '24px', alignItems: 'start' }}>

                        {/* Booking Widget */}
                        <div className="table-container" style={{ padding: '24px' }}>
                            <h3 style={{ fontSize: '18px', fontWeight: '700', marginBottom: '20px', color: 'var(--text-main)' }}>Request a Ride</h3>

                            {/* Inputs */}
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '25px' }}>
                                <div style={{ position: 'relative' }}>
                                    <div style={{ position: 'absolute', left: '12px', top: '15px', width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#14b8a6' }}></div>
                                    <input
                                        type="text"
                                        placeholder="Enter Pickup Location"
                                        value={pickup}
                                        onChange={(e) => setPickup(e.target.value)}
                                        style={{ width: '100%', padding: '12px 14px 12px 35px', borderRadius: '8px', border: '1px solid #e2e8f0', backgroundColor: '#f8fafc', fontSize: '14px', outline: 'none' }}
                                    />
                                    <div style={{ position: 'absolute', left: '15px', top: '35px', width: '2px', height: '20px', backgroundColor: '#e2e8f0' }}></div>
                                </div>
                                <div style={{ position: 'relative' }}>
                                    <div style={{ position: 'absolute', left: '12px', top: '15px', width: '8px', height: '8px', backgroundColor: '#f43f5e' }}></div>
                                    <input
                                        type="text"
                                        placeholder="Enter Drop-off Location"
                                        value={dropoff}
                                        onChange={(e) => setDropoff(e.target.value)}
                                        style={{ width: '100%', padding: '12px 14px 12px 35px', borderRadius: '8px', border: '1px solid #e2e8f0', backgroundColor: '#f8fafc', fontSize: '14px', outline: 'none' }}
                                    />
                                </div>
                            </div>

                            <hr style={{ border: 'none', borderTop: '1px solid #f1f5f9', marginBottom: '20px' }} />

                            {/* Ride Options */}
                            <h4 style={{ fontSize: '14px', fontWeight: '600', marginBottom: '15px', color: 'var(--text-muted)' }}>AVAILABLE RIDES</h4>

                            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '25px' }}>
                                {rideOptions.map(ride => (
                                    <div
                                        key={ride.id}
                                        onClick={() => setSelectedRide(ride.id)}
                                        style={{
                                            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                                            padding: '12px 16px', borderRadius: '10px', cursor: 'pointer',
                                            border: selectedRide === ride.id ? '2px solid #0f766e' : '1px solid #e2e8f0',
                                            backgroundColor: selectedRide === ride.id ? '#f0fdfa' : 'white',
                                            transition: 'all 0.2s ease'
                                        }}
                                    >
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                                            <span style={{ fontSize: '24px' }}>{ride.icon}</span>
                                            <div>
                                                <div style={{ fontSize: '14px', fontWeight: '600', color: 'var(--text-main)' }}>{ride.name}</div>
                                                <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>{ride.time}</div>
                                            </div>
                                        </div>
                                        <div style={{ fontSize: '15px', fontWeight: '700', color: 'var(--text-main)' }}>
                                            {ride.price}
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Book Button */}
                            <button
                                onClick={handleBooking}
                                style={{ width: '100%', padding: '14px', borderRadius: '10px', background: 'linear-gradient(135deg, #0f766e, #14b8a6)', color: 'white', fontSize: '15px', fontWeight: '600', border: 'none', cursor: 'pointer', boxShadow: '0 4px 15px rgba(20, 184, 166, 0.3)' }}
                            >
                                Request {selectedRide ? rideOptions.find(r => r.id === selectedRide).name.split(" ")[0] : "Ride"}
                            </button>

                        </div>

                        {/* Map Area */}
                        <div className="table-container" style={{ padding: '0', overflow: 'hidden', height: '100%' }}>
                            <LiveMap />
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default CustomerDashboard;
