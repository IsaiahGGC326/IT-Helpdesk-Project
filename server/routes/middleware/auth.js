const jwt = require('jsonwebtoken');
const User = require('../../models/User');

const authMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader?.split(' ')[1];

  console.log('[AUTH] Incoming Token:', token); // ✅ Log token

  if (!token) {
    console.warn('[AUTH] No token provided');
    return res.status(401).json({ error: 'No token provided' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log('[AUTH] Decoded ID:', decoded.id); // ✅ Log decoded ID

    const user = await User.findById(decoded.id);
    console.log('[AUTH] Loaded User:', user); // ✅ Log loaded user

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    req.user = user;
    next();
  } catch (err) {
    console.error('[AUTH] Token error:', err.message);
    res.status(401).json({ error: 'Invalid token' });
  }
};

module.exports = authMiddleware;
