const Admin = require("../models/admin");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const registerAdmin = async (username, password) => {
  try {
    const existingAdmin = await Admin.findOne({ username });
    if (existingAdmin) {
      throw new Error("Admin already exists");
    }
    const newAdmin = new Admin({ username, password });
    await newAdmin.save();
    return newAdmin;
  } catch (error) {
    throw new Error("Error registering admin: " + error.message);
  }
};

const loginAdmin = async (username, password) => {
  try {
    const admin = await Admin.findOne({ username });
    if (!admin) {
      throw new Error("Invalid credentials");
    }
    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      throw new Error("Invalid credentials");
    }
    const token = jwt.sign(
      { id: admin._id, role: admin.role },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );
    return { admin, token };
  } catch (error) {
    throw new Error("Error logging in admin: " + error.message);
  }
};

const getAllAdmins = async () => {
  try {
    const admins = await Admin.find().select("-password");
    return admins;
  } catch (error) {
    throw new Error("Error fetching admins: " + error.message);
  }
};

const getAdminByID = async (id) => {
  try {
    const admins = await Admin.findById(id).select("-password");
    return admins;
  } catch (error) {
    throw new Error("Error fetching admin" + error.message);
  }
};

const updateAdmin = async (id, updates) => {
  const { username, password } = updates;
  const admin = await Admin.findByIdAndUpdate(
    id,
    { username, password },
    { new: true }
  );

  if (!admin) throw new Error("Admin not found");
  return admin;
};

const deleteAdmin = async (id) => {
    const admin = await Admin.findByIdAndDelete(id)
    if(!admin) throw new Error("Admin not found")
    return admin
};

module.exports = {
  registerAdmin,
  loginAdmin,
  getAllAdmins,
  getAdminByID,
  updateAdmin,
  deleteAdmin
};
