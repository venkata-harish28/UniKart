const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  email: {
    type: String, required: true, unique: true,
    match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Invalid email'],
  },
  password: { type: String, required: true, minlength: 6, select: false },
  avatar: { type: String, default: '' },
  college: { type: String, required: true },
  phone: { type: String },
  isVerified: { type: Boolean, default: false },
  isAdmin: { type: Boolean, default: false },
  isBanned: { type: Boolean, default: false },
  wishlist: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }],
  otp: { code: String, expiresAt: Date },
  rating: { average: { type: Number, default: 0 }, count: { type: Number, default: 0 } },
  createdAt: { type: Date, default: Date.now },
}, { timestamps: true });

userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

userSchema.methods.comparePassword = async function(candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model('User', userSchema);