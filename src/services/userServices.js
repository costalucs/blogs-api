const { User } = require('../models');

const findUser = async (email) => {
  const user = await User.findOne({ where: { email } });
  if (user) {
    console.log('usuário existe');
    return { type: true, message: 'User already registered' }; 
}
  console.log('não existe');
  return { type: false };
};

const createUser = async (displayName, email, password, image) => {
  const newUser = await User.create({ displayName, email, password, image });
  console.log(newUser);
  return newUser;
};

module.exports = { findUser, createUser };