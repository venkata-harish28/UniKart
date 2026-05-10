const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  type: {
    type: String,
    enum: ['new_message','new_offer','product_sold',
           'review_received','admin_alert','system'],
    required: true,
  },
  title: { type: String, required: true },
  body: { type: String },
  link: { type: String },
  isRead: { type: Boolean, default: false },
  data: { type: mongoose.Schema.Types.Mixed },
}, { timestamps: true });

module.exports = mongoose.model('Notification', notificationSchema);