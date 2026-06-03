const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  room: { type: mongoose.Schema.Types.ObjectId, ref: 'Room', required: true },
  guestName: { type: String, required: true },
  guestEmail: { type: String, required: true },
  guestPhone: { type: String, required: true },
  checkIn: { type: Date, required: true },
  checkOut: { type: Date, required: true },
  adults: { type: Number, default: 1 },
  children: { type: Number, default: 0 },
  totalPrice: { type: Number, required: true },
  status: { type: String, enum: ['pending', 'confirmed', 'cancelled', 'completed'], default: 'pending' },
  specialRequests: { type: String },
}, { timestamps: true });

module.exports = mongoose.model('Booking', bookingSchema);
