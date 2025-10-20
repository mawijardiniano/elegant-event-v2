const {getAllBooking, createBooking, updateBooking, deleteBooking} = require('../controller/booking.controller')
const express = require('express')
const router = express.Router()
const {verifyToken} = require('../middleware/verifyToken');
const {requireRole} = require('../middleware/role')

router.get('/', getAllBooking)
router.post('/', createBooking);
router.put('/:id', verifyToken, requireRole('admin'), updateBooking)
router.delete('/:id', verifyToken, requireRole('admin'), deleteBooking)

module.exports = router