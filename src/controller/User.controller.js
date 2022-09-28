const jwt = require('jsonwebtoken');
const createToken = require('../utils/createToken');
const UserServices = require('../services/userServices');

const secret = process.env.JWT_SECRET || 'suaSenhaSecreta';

const postUser = async (req, res) => {
  try {
    const { displayName, email, password, image } = req.body;
    const { type, message } = await UserServices.findUser(email);

    if (type) return res.status(409).json({ message });

    await UserServices.createUser(displayName, email, password, image);

    const token = createToken({ email });

    return res.status(201).json({ token });
  } catch (erro) {
    return res.status(500).json({ message: erro.message });
  }
};

const getAllUsers = async (req, res) => {
  const users = await UserServices.findAll();
  return res.status(200).json(users);
};

const getUserById = async (req, res) => {
  const { id } = req.params;
  const user = await UserServices.findById(id);
  if (!user) return res.status(404).json({ message: 'User does not exist' });
  return res.status(200).json(user);
};

const deleteUser = async (req, res) => {
  const token = req.header('Authorization');
  const { email } = jwt.verify(token, secret);
  const { user: { dataValues: { id } } } = await UserServices.findUser(email);

  await UserServices.destroyUser(id);

  return res.status(204).json();
};

module.exports = { postUser, getAllUsers, getUserById, deleteUser };