const mongoose = require('mongoose');

const roomSchema = new mongoose.Schema({
  name: { type: String, required: true },
  type: { type: String, enum: ['Standard', 'Deluxe', 'Suite', 'Presidential'], required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  capacity: { type: Number, required: true },
  size: { type: String },
  amenities: [String],
  images: [String],
  available: { type: Boolean, default: true },
  featured: { type: Boolean, default: false },
}, { timestamps: true });

module.exports = mongoose.model('Room', roomSchema);
