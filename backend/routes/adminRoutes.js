import express from "express";
import { getAllUsers } from "../controllers/adminController.js";
import { protect } from "../middleware/protect.js";
import { authorize } from "../middleware/authorize.js";

const router = express.Router();

router.get("/users", protect, authorize("admin"), getAllUsers);

router.get(
  "/dashboard",
  protect,
  authorize("ADMIN"),
  (req, res) => {
    res.json({ message: "Welcome Admin Dashboard" });
  }
);

export default router;