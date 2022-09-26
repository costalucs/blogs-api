const LoginService = require('../services/loginServices');
const createToken = require('../utils/createToken');

const Login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const { type, message } = await LoginService.fieldVerification(email, password);

    if (type) return res.status(400).json({ message });    

    const payload = {
      email,
    };

    const token = createToken(payload);
    return res.status(200).json({ token });
  } catch (erro) {
    return res.status(400).json(erro.message);
  }
};

module.exports = { Login };