import User from "../models/User.js";

// ===============================
// @desc   Get All Users
// @route  GET /api/admin/users
// @access Admin
// ===============================
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};