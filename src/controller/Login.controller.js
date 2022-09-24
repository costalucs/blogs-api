const jwt = require('jsonwebtoken');
const LoginService = require('../services/loginServices');

require('dotenv/config');

const secret = process.env.JWT_SECRET || 'suaSenhaSecreta';

const Login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const { type, message } = await LoginService.fieldVerification(email, password);

    if (type) return res.status(400).json({ message });

    const jwtConfig = {
      expiresIn: '1d',
      algorithm: 'HS256',
    };

    const payload = {
      email,
    };

    const token = jwt.sign(payload, secret, jwtConfig);
    return res.status(200).json({ token });
  } catch (erro) {
    return res.status(400).json(erro.message);
  }
};

module.exports = { Login };