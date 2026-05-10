const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  sender: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  content: { type: String, required: true },
  type: { type: String, enum: ['text','image'], default: 'text' },
  readBy: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  createdAt: { type: Date, default: Date.now },
});

const chatSchema = new mongoose.Schema({
  participants: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
  messages: [messageSchema],
  lastMessage: { type: String },
  lastMessageAt: { type: Date },
  isActive: { type: Boolean, default: true },
}, { timestamps: true });

module.exports = mongoose.model('Chat', chatSchema);