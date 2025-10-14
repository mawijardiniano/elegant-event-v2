const { createEvent, getAllEvents, updateEvent, deleteEvent} = require('../controller/event.controller')
const express = require('express');
const router = express.Router();

const { verifyToken } = require('../middleware/verifyToken')
const {requireRole} = require('../middleware/role')


router.post('/', verifyToken, requireRole('admin'), createEvent)
router.get('/', getAllEvents)
router.put('/:id',verifyToken, requireRole('admin'), updateEvent)
router.delete('/:id',verifyToken, requireRole('admin'), deleteEvent)


module.exports = router