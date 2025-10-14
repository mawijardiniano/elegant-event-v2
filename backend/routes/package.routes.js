const {
  createPackage,
  getAllPackages,
  updatePackage,
  deletePackage
} = require("../controller/package.controller");
const express = require("express");
const router = express.Router();

const { verifyToken } = require("../middleware/verifyToken");
const { requireRole } = require("../middleware/role");
router.post("/", verifyToken, requireRole("admin"), createPackage);
router.get("/", getAllPackages);
router.put("/:id", verifyToken, requireRole("admin"), updatePackage);
router.delete("/:id", verifyToken, requireRole('admin'), deletePackage)

module.exports = router;
