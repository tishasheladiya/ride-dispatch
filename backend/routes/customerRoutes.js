import express from "express";
import { bookRide, getMyRides } from "../controllers/customerController.js";
import { protect } from "../middleware/protect.js";
import { authorize } from "../middleware/authorize.js";

const router = express.Router();

router.post("/ride", protect, authorize("CUSTOMER"), bookRide);
router.get("/rides", protect, authorize("CUSTOMER"), getMyRides);

export default router;
