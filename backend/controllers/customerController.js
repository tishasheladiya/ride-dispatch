import Ride from "../models/Ride.js";

// @desc    Book a new ride
// @route   POST /api/customer/ride
// @access  Private (Customer only)
export const bookRide = async (req, res) => {
    const { pickupLocation, dropoffLocation, rideType, price } = req.body;

    try {
        const ride = await Ride.create({
            customerId: req.user.id,
            pickupLocation,
            dropoffLocation,
            rideType,
            price,
        });

        res.status(201).json(ride);
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

// @desc    Get all rides for a customer
// @route   GET /api/customer/rides
// @access  Private (Customer only)
export const getMyRides = async (req, res) => {
    try {
        const rides = await Ride.find({ customerId: req.user.id })
            .populate("driverId", "name")
            .sort("-createdAt");

        res.json(rides);
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};
