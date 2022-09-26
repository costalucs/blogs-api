const jwt = require('jsonwebtoken');
require('dotenv/config');

const secret = process.env.JWT_SECRET || 'suaSenhaSecreta';

module.exports = (payload) => {
  const jwtConfig = {
    expiresIn: '7d',
    algorithm: 'HS256',
  };
  const token = jwt.sign(payload, secret, jwtConfig);
  console.log('createToken: ', token);
  return token;
};