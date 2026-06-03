const router = require('express').Router();
const Booking = require('../models/Booking');
const Room = require('../models/Room');
const auth = require('../middleware/auth');

router.post('/', async (req, res) => {
  const { roomId, checkIn, checkOut, adults, children, guestName, guestEmail, guestPhone, specialRequests } = req.body;
  const room = await Room.findById(roomId);
  if (!room) return res.status(404).json({ message: 'Room not found' });
  const nights = Math.ceil((new Date(checkOut) - new Date(checkIn)) / (1000 * 60 * 60 * 24));
  if (nights < 1) return res.status(400).json({ message: 'Invalid dates' });
  const totalPrice = room.price * nights;
  const booking = await Booking.create({
    room: roomId, guestName, guestEmail, guestPhone,
    checkIn, checkOut, adults, children, totalPrice, specialRequests,
  });
  await booking.populate('room');
  res.status(201).json(booking);
});

router.get('/', auth, async (req, res) => {
  const bookings = await Booking.find().populate('room').sort('-createdAt');
  res.json(bookings);
});

router.get('/stats', auth, async (req, res) => {
  const total = await Booking.countDocuments();
  const pending = await Booking.countDocuments({ status: 'pending' });
  const confirmed = await Booking.countDocuments({ status: 'confirmed' });
  const cancelled = await Booking.countDocuments({ status: 'cancelled' });
  const revenue = await Booking.aggregate([
    { $match: { status: { $in: ['confirmed', 'completed'] } } },
    { $group: { _id: null, total: { $sum: '$totalPrice' } } },
  ]);
  res.json({ total, pending, confirmed, cancelled, revenue: revenue[0]?.total || 0 });
});

router.put('/:id/status', auth, async (req, res) => {
  const booking = await Booking.findByIdAndUpdate(
    req.params.id, { status: req.body.status }, { new: true }
  ).populate('room');
  if (!booking) return res.status(404).json({ message: 'Booking not found' });
  res.json(booking);
});

router.delete('/:id', auth, async (req, res) => {
  await Booking.findByIdAndDelete(req.params.id);
  res.json({ message: 'Booking deleted' });
});

module.exports = router;
