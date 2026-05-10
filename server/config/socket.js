const Chat = require('../models/Chat');
const Notification = require('../models/Notification');

let io;

exports.initSocket = (socketIo) => {
  io = socketIo;

  io.on('connection', (socket) => {
    console.log('User connected:', socket.id);

    // Join personal room
    socket.on('join', (userId) => {
      socket.join(`user:${userId}`);
    });

    // Join chat room
    socket.on('join_chat', (chatId) => {
      socket.join(`chat:${chatId}`);
    });

    // Send message
    socket.on('send_message', async ({ chatId, senderId, content }) => {
      const chat = await Chat.findById(chatId);
      if (!chat) return;

      const message = { sender: senderId, content, createdAt: new Date() };
      chat.messages.push(message);
      chat.lastMessage = content;
      chat.lastMessageAt = new Date();
      await chat.save();

      io.to(`chat:${chatId}`).emit('new_message', {
        chatId,
        message: { ...message, sender: senderId },
      });

      // Notify the other participant
      const otherId = chat.participants.find(p => p.toString() !== senderId);
      if (otherId) {
        io.to(`user:${otherId}`).emit('notification', {
          type: 'new_message',
          title: 'New message',
          body: content.substring(0, 50),
        });
      }
    });

    socket.on('typing', ({ chatId, userId }) => {
      socket.to(`chat:${chatId}`).emit('user_typing', { userId });
    });

    socket.on('stop_typing', ({ chatId, userId }) => {
      socket.to(`chat:${chatId}`).emit('user_stop_typing', { userId });
    });

    socket.on('disconnect', () => {
      console.log('User disconnected:', socket.id);
    });
  });
};

exports.getIO = () => {
  if (!io) throw new Error('Socket.io not initialized');
  return io;
};