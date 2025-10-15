const {
  getAllService,
  createService,
  updateService,
  deleteService
} = require("../controller/service.controller");
const express = require("express");
const router = express.Router();
const { verifyToken } = require("../middleware/verifyToken");
const { requireRole } = require("../middleware/role");

router.get("/", getAllService);
router.post("/", verifyToken, requireRole("admin"), createService);
router.put('/:id', verifyToken, requireRole('admin'), updateService);
router.delete('/:id', verifyToken, requireRole('admin'), deleteService)



module.exports = router;
