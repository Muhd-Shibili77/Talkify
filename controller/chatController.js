// controllers/chatController.js
const Message = require('../model/message');

// Fetch chat messages
exports.getChatMessages = async (req, res) => {
  try {
    const messages = await Message.find().sort({ timestamp: 1 });
    res.render('page', { messages });
  } catch (error) {
    res.status(500).send('Error fetching messages');
  }
};

// Save a new chat message
exports.saveMessage = async (msg) => {
  try {
    const message = new Message({ content: msg });
    await message.save();
  } catch (error) {
    console.error('Error saving message:', error);
  }
};
