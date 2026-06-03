const router = require('express').Router();

router.post('/', (req, res) => {
  res.status(201).json({ message: 'Booking received. We will contact you shortly.' });
});

router.get('/', (req, res) => res.json([]));
router.get('/stats', (req, res) => res.json({ total: 0, pending: 0, confirmed: 0, cancelled: 0, revenue: 0 }));
router.put('/:id/status', (req, res) => res.json({ message: 'Updated' }));
router.delete('/:id', (req, res) => res.json({ message: 'Deleted' }));

module.exports = router;
