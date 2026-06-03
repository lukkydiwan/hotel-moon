const router = require('express').Router();
const jwt = require('jsonwebtoken');

router.post('/login', (req, res) => {
  const { email, password } = req.body;
  if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
    const token = jwt.sign({ id: 'admin' }, process.env.JWT_SECRET || 'secret', { expiresIn: '7d' });
    return res.json({ token, email });
  }
  res.status(401).json({ message: 'Invalid credentials' });
});

router.get('/me', (req, res) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'No token' });
  try {
    jwt.verify(token, process.env.JWT_SECRET || 'secret');
    res.json({ email: process.env.ADMIN_EMAIL });
  } catch {
    res.status(401).json({ message: 'Invalid token' });
  }
});

module.exports = router;
