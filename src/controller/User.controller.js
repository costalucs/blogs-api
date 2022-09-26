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

const getAllUsers = async (req, res) => {
  const users = await UserService.findAll();
  return res.status(200).json(users);
};

const getUserById = async (req, res) => {
  const { id } = req.params;
  const user = await UserService.findById(id);
  if (!user) return res.status(404).json({ message: 'User does not exist' });
  return res.status(200).json(user);
};

module.exports = { postUser, getAllUsers, getUserById };