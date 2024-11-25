const express = require('express');
const { blockUsers, unblockUsers, deleteUsers } = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

router.use(authMiddleware);
router.post('/block', blockUsers);
router.post('/unblock', unblockUsers);
router.post('/delete', deleteUsers);

module.exports = router;