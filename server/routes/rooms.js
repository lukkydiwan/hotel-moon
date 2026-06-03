const router = require('express').Router();
const Room = require('../models/Room');
const auth = require('../middleware/auth');

router.get('/', async (req, res) => {
  const filter = {};
  if (req.query.type) filter.type = req.query.type;
  if (req.query.available) filter.available = req.query.available === 'true';
  const rooms = await Room.find(filter);
  res.json(rooms);
});

router.get('/featured', async (req, res) => {
  const rooms = await Room.find({ featured: true, available: true });
  res.json(rooms);
});

router.get('/:id', async (req, res) => {
  const room = await Room.findById(req.params.id);
  if (!room) return res.status(404).json({ message: 'Room not found' });
  res.json(room);
});

router.post('/', auth, async (req, res) => {
  const room = await Room.create(req.body);
  res.status(201).json(room);
});

router.put('/:id', auth, async (req, res) => {
  const room = await Room.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!room) return res.status(404).json({ message: 'Room not found' });
  res.json(room);
});

router.delete('/:id', auth, async (req, res) => {
  await Room.findByIdAndDelete(req.params.id);
  res.json({ message: 'Room deleted' });
});

module.exports = router;
