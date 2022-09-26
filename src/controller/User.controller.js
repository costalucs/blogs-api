const createToken = require('../utils/createToken');
const UserService = require('../services/userServices');

const postUser = async (req, res) => {
  try {
    const { displayName, email, password, image } = req.body;
    const { type, message } = await UserService.findUser(email);
    
    if (type) return res.status(409).json({ message });
    
    await UserService.createUser(displayName, email, password, image);

    const token = createToken({ email });

    return res.status(201).json({ token });
  } catch (erro) {
    return res.status(500).json({ message: erro.message });
  }
};

module.exports = { postUser };