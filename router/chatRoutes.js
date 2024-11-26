const express = require('express');
const router = express.Router();
const chatController = require('../controller/chatController');

// Render the chat page with previous messages
router.get('/', chatController.getChatMessages);

module.exports = router