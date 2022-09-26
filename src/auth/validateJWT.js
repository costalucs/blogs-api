const jwt = require('jsonwebtoken');
require('dotenv/config');

const secret = process.env.JWT_SECRET || 'suaSenhaSecreta';

module.exports = async (req, res, next) => {
  const token = req.header('Authorization');
  if (!token) {
    return res.status(401).json({ message: 'Token not found' });
  }
  try {
    const decoded = jwt.verify(token, secret);
    console.log(decoded);
    return next();
  } catch (error) {
    res.status(401).json({ message: 'Expired or invalid token' });
  }
};