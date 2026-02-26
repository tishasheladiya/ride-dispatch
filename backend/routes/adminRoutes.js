// import express from "express";
// //import { getAllUsers } from "../controllers/adminController.js";
// import { protect } from "../middleware/protect.js";
// import { authorize } from "../middleware/authorize.js";
// //import { getAllUsers, deleteUser } from "../controllers/adminController.js";
// //import { getAllUsers, deleteUser, updateUserRole } from "../controllers/adminController.js";
// import { getAllUsers, deleteUser, updateUserRole, toggleBlockUser, getAdminStats } from "../controllers/adminController.js";
// import { getDashboardStats } from "../controllers/adminController.js";

// const router = express.Router();

// router.get("/users", protect, authorize("ADMIN"), getAllUsers);
// router.delete("/users/:id", protect, authorize("ADMIN"), deleteUser);
// router.put("/users/:id", protect, authorize("ADMIN"), updateUserRole);
// router.put("/users/block/:id", protect, authorize("ADMIN"), toggleBlockUser);
// router.get("/stats", protect, authorize("ADMIN"), getAdminStats);
// router.get("/users", adminMiddleware, getAllUsers);
// router.put("/block/:id", adminMiddleware, blockUser);

// router.get(
//   "/dashboard",
//   protect,
//   authorize("ADMIN"),
//   (req, res) => {
//     res.json({ message: "Welcome Admin Dashboard" });
//   }
// );

// router.get(
//   "/stats",
//   protect,
//   authorize("ADMIN"),
//   getDashboardStats
// );
// // if (user.role === "ADMIN") {
// //   return res.status(400).json({ message: "Cannot delete admin" });
// // }

// export default router;

//``````````````````````````````````````````new```````````````````````

import express from "express";
import { protect } from "../middleware/protect.js";
import { authorize } from "../middleware/authorize.js";

import {
  getAllUsers,
  deleteUser,
  updateUserRole,
  toggleBlockUser,
  getAdminStats,
  getDashboardStats,
} from "../controllers/adminController.js";

const router = express.Router();

// USERS
router.get("/users", protect, authorize("ADMIN"), getAllUsers);
router.delete("/users/:id", protect, authorize("ADMIN"), deleteUser);
router.put("/users/:id", protect, authorize("ADMIN"), updateUserRole);
router.put("/users/block/:id", protect, authorize("ADMIN"), toggleBlockUser);

// STATS
router.get("/stats", protect, authorize("ADMIN"), getAdminStats);

// DASHBOARD
router.get(
  "/dashboard",
  protect,
  authorize("ADMIN"),
  (req, res) => {
    res.json({ message: "Welcome Admin Dashboard" });
  }
);

export default router;