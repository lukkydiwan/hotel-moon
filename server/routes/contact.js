const router = require('express').Router();

router.post('/', (req, res) => {
  res.status(201).json({ message: 'Message sent successfully' });
});

router.get('/', (req, res) => res.json([]));
router.put('/:id/read', (req, res) => res.json({ message: 'Marked as read' }));
router.delete('/:id', (req, res) => res.json({ message: 'Deleted' }));

module.exports = router;
