const authService = require("../services/auth");

const registerAdmin = async (req, res) => {
  const { username, password } = req.body;
  try {
    const result = await authService.registerAdmin(username, password);
    res.status(201).json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const loginAdmin = async (req, res) => {
  const { username, password } = req.body;
  try {
    const { admin, token } = await authService.loginAdmin(username, password);
    res.status(200).json({ admin, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getAllAdmins = async (req, res) => {
  try {
    const admins = await authService.getAllAdmins();
    res.status(200).json(admins);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getAdminByID = async (req, res) => {
  try {
    const { id } = req.params;
    const admin = await authService.getAdminByID(id);
    res.status(200).json(admin);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const updateAdmin = async (req, res) => {
  try {
    const { id } = req.params;
    const { username, password } = req.body;
    const admin = await authService.updateAdmin(id, { username, password });
    res.json({ message: " Admin updated successfully" }, admin);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const deleteAdmin = async (req, res) => {
  try {
    const { id } = req.params;
    const admin = await authService.deleteAdmin(id);
    res.status(200).json({ message: "Admin deleted successfuly" }, admin);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  registerAdmin,
  loginAdmin,
  getAllAdmins,
  getAdminByID,
  updateAdmin,
  deleteAdmin,
};
