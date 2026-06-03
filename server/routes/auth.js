const router = require('express').Router();
const jwt = require('jsonwebtoken');
const Admin = require('../models/Admin');
const authMiddleware = require('../middleware/auth');

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const admin = await Admin.findOne({ email });
  if (!admin || !(await admin.matchPassword(password)))
    return res.status(401).json({ message: 'Invalid credentials' });
  const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
  res.json({ token, email: admin.email });
});

router.get('/me', authMiddleware, (req, res) => {
  res.json({ email: req.admin.email });
});

module.exports = router;
