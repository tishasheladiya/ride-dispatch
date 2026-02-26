import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { useEffect, useState } from "react";

// Fix React-Leaflet missing icon issue by recreating custom simple markers
const createCustomIcon = (color) => {
    return L.divIcon({
        className: "custom-div-icon",
        html: `<div style='background-color:${color}; width: 14px; height: 14px; border-radius: 50%; border: 2px solid white; box-shadow: 0 0 4px rgba(0,0,0,0.5);'></div>`,
        iconSize: [14, 14],
        iconAnchor: [7, 7],
    });
};

const driverIcon = createCustomIcon('#38c172'); // Green for active driver
const customerIcon = createCustomIcon('#637aff'); // Blue for customer requested ride
const dispatchIcon = createCustomIcon('#f59e0b'); // Orange for dispatch hub

// Dummy coordinates for the example
const DISPATCH_CENTER = [28.6139, 77.2090]; // New Delhi, India

const LiveMap = () => {
    // Generate some random nearby drivers in India (Delhi NCR)
    const [drivers, setDrivers] = useState([
        { id: 1, name: "Rahul Sharma", pos: [28.5355, 77.3910], status: "Active" }, // Noida
        { id: 2, name: "Amit Kumar", pos: [28.4595, 77.0266], status: "On Ride" }, // Gurgaon
        { id: 3, name: "Priya Singh", pos: [28.7041, 77.1025], status: "Active" }, // Delhi North
    ]);

    return (
        <div style={{ height: "400px", width: "100%", borderRadius: "12px", overflow: "hidden", zIndex: 1, position: "relative" }}>
            <MapContainer center={DISPATCH_CENTER} zoom={11} style={{ height: "100%", width: "100%" }}>
                {/* Dark theme map tiles from CartoDB */}
                <TileLayer
                    url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
                />

                {/* Dispatch Center Output */}
                <Marker position={DISPATCH_CENTER} icon={dispatchIcon}>
                    <Popup>
                        <b>Main Dispatch Hub</b> <br /> Operations Center
                    </Popup>
                </Marker>

                {/* Drivers */}
                {drivers.map(driver => (
                    <Marker key={driver.id} position={driver.pos} icon={driverIcon}>
                        <Popup>
                            <b>Driver:</b> {driver.name} <br />
                            <b>Status:</b> {driver.status}
                        </Popup>
                    </Marker>
                ))}
            </MapContainer>
        </div>
    );
};

export default LiveMap;
