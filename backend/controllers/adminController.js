import User from "../models/User.js";

// ===============================
// @desc   Get All Users
// @route  GET /api/admin/users
// @access Admin
// ===============================

export const getAllUsers = async (req, res) => {
  const users = await User.find().select("-password");
  res.json(users);
};

export const blockUser = async (req, res) => {
  const user = await User.findById(req.params.id);

  user.isBlocked = !user.isBlocked;
  await user.save();

  res.json({ message: "User status updated" });
};

// ===============================
// @desc   Delete User
// @route  DELETE /api/admin/users/:id
// @access Admin
// ===============================
export const deleteUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    await user.deleteOne();

    res.json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

// ===============================
// @desc   Update User Role
// @route  PUT /api/admin/users/:id
// @access Admin
// ===============================
export const updateUserRole = async (req, res) => {
  try {
    const { role } = req.body;

    // 🔥 ADD VALIDATION HERE
    const allowedRoles = ["ADMIN", "CUSTOMER", "DRIVER"];

    if (!allowedRoles.includes(role)) {
      return res.status(400).json({ message: "Invalid role" });
    }

    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.role = role;
    await user.save();

    res.json({
      message: "User role updated successfully",
      user,
    });

  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

//```````````````````Block / Unblock Controller```````````````````````````````````
export const toggleBlockUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.isBlocked = !user.isBlocked;
    await user.save();

    res.json({
      message: `User ${user.isBlocked ? "blocked" : "unblocked"} successfully`,
      user,
    });

  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

//``````````````Controller`````````````````````````````````
export const getAdminStats = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalDrivers = await User.countDocuments({ role: "DRIVER" });
    const totalCustomers = await User.countDocuments({ role: "CUSTOMER" });
    const blockedUsers = await User.countDocuments({ isBlocked: true });

    res.json({
      totalUsers,
      totalDrivers,
      totalCustomers,
      blockedUsers,
    });

  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

//```````````````admin dasbord ma dainamic data lavva````````

export const getDashboardStats = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments({ role: "CUSTOMER" });
    const activeDrivers = await User.countDocuments({ role: "DRIVER", isBlocked: false });
    const totalDrivers = await User.countDocuments({ role: "DRIVER" });

    res.json({
      totalUsers,
      activeDrivers,
      totalDrivers
    });

  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};