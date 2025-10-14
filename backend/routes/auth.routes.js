const express = require("express");
const router = express.Router();
const {
  registerAdmin,
  loginAdmin,
  getAllAdmins,
  getAdminByID,
  updateAdmin,
  deleteAdmin,
} = require("../controller/auth.controller");

const { verifyToken } = require("../middleware/verifyToken");
const { requireRole } = require("../middleware/role");

router.post("/register", verifyToken, requireRole("admin"), registerAdmin);
router.post("/login", loginAdmin);

router.get("/admins", verifyToken, requireRole("admin"), getAllAdmins);
router.get("/admin/:id", verifyToken, requireRole("admin"), getAdminByID);
router.put("/:id", verifyToken, requireRole("admin"), updateAdmin);
router.delete("/delete/:id", verifyToken, requireRole("admin"), deleteAdmin);
module.exports = router;
