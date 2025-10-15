const { getAllVenue, createVenue, updateVenue, deleteVenue } = require("../controller/venue.controller");
const express = require("express");
const router = express.Router();
const { verifyToken } = require("../middleware/verifyToken");
const { requireRole } = require("../middleware/role");

router.get('/', getAllVenue);
router.post('/', verifyToken, requireRole('admin'), createVenue)
router.put('/:id', verifyToken, requireRole('admin'), updateVenue)
router.delete('/:id', verifyToken, requireRole('admin'), deleteVenue)

module.exports = router;
