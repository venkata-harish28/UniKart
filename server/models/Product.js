const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true, maxlength: 100 },
  description: { type: String, required: true, maxlength: 2000 },
  price: { type: Number, required: true, min: 0 },
  originalPrice: { type: Number },
  category: {
    type: String, required: true,
    enum: ['Electronics','Books','Clothing','Furniture',
           'Sports','Stationery','Vehicles','Others'],
  },
  condition: { type: String, enum: ['New','Like New','Good','Fair'], required: true },
  images: [{ url: String, publicId: String }],
  seller: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  location: { type: String },
  tags: [String],
  isAvailable: { type: Boolean, default: true },
  isFeatured: { type: Boolean, default: false },
  views: { type: Number, default: 0 },
  wishlistCount: { type: Number, default: 0 },
  college: { type: String },
}, { timestamps: true });

productSchema.index({ title: 'text', description: 'text', tags: 'text' });
productSchema.index({ category: 1, price: 1, createdAt: -1 });

module.exports = mongoose.model('Product', productSchema);