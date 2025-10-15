const { getAllTag, createTag, updateTag, deleteTag} = require('../controller/tag.controller')
const express = require('express')
const router = express.Router()
const { verifyToken } = require("../middleware/verifyToken");
const { requireRole } = require("../middleware/role");

router.get('/', getAllTag)
router.post('/', verifyToken, requireRole('admin'), createTag);
router.put('/:id', verifyToken, requireRole('admin'), updateTag);
router.delete('/:id', verifyToken, requireRole('admin'), deleteTag)


module.exports = router
