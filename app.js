const express = require('express');
const app = express();
const mongodb = require('./config/Db');
const chatRoutes = require('./router/chatRoutes');
const http = require('http');
const socketIO = require('socket.io');
const chatController = require('./controller/chatController');

// Connect to MongoDB
mongodb();

// Set the view engine
app.set('view engine', 'ejs');

// Serve static files
app.use(express.static('public'));

// Use chat routes
app.use('/', chatRoutes);

// Create an HTTP server and attach the Express app
const server = http.createServer(app);

// Attach Socket.IO to the HTTP server
const io = socketIO(server);

// Handle Socket.IO connections
io.on('connection', (socket) => {
    console.log('A user connected');

    socket.on('disconnect', () => {
        console.log('User disconnected');
    });

    // Handle chat messages
    socket.on('chat message', (msg) => {
        chatController.saveMessage(msg); // Save message to DB
        io.emit('chat message', msg);    // Broadcast the message
    });
});


// Start the server
const PORT = 3000;
server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
