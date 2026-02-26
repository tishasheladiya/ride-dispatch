import mongoose from "mongoose";

const rideSchema = new mongoose.Schema(
    {
        customerId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        driverId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
        pickupLocation: {
            type: String,
            required: true,
        },
        dropoffLocation: {
            type: String,
            required: true,
        },
        rideType: {
            type: String, // mini, prime, suv
            required: true,
        },
        price: {
            type: Number,
            required: true,
        },
        status: {
            type: String,
            enum: ["Pending", "Accepted", "Completed", "Cancelled"],
            default: "Pending",
        },
    },
    { timestamps: true }
);

export default mongoose.model("Ride", rideSchema);
