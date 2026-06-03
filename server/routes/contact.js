const router = require('express').Router();
const Contact = require('../models/Contact');
const auth = require('../middleware/auth');

router.post('/', async (req, res) => {
  const contact = await Contact.create(req.body);
  res.status(201).json({ message: 'Message sent successfully', id: contact._id });
});

router.get('/', auth, async (req, res) => {
  const messages = await Contact.find().sort('-createdAt');
  res.json(messages);
});

router.put('/:id/read', auth, async (req, res) => {
  await Contact.findByIdAndUpdate(req.params.id, { read: true });
  res.json({ message: 'Marked as read' });
});

router.delete('/:id', auth, async (req, res) => {
  await Contact.findByIdAndDelete(req.params.id);
  res.json({ message: 'Deleted' });
});

module.exports = router;
