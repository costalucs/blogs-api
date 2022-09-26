const { User } = require('../models');

const findUser = async (email) => {
  const user = await User.findOne({ where: { email } });
  if (user) {
    return { type: true, message: 'User already registered' }; 
}
  return { type: false };
};

const findById = async (id) => {
  const user = await User.findOne({ where: { id } });
  return user;
};

const findAll = async () => {
  const allUsers = await User
  .findAll({ attributes: ['id', ['display_name', 'displayName'], 'email', 'image'] });
  return allUsers;
};

const createUser = async (displayName, email, password, image) => {
  const newUser = await User.create({ displayName, email, password, image });
  return newUser;
};

module.exports = { findUser, createUser, findAll, findById };