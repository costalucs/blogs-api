const { User } = require('../models');

const fieldVerification = async (email, password) => {
  const user = await User.findOne({ where: { email } });
  if (!user || user.password !== password) {
    return { type: true, message: 'Invalid fields' };
  }
  return { type: false, message: user };
};

module.exports = { fieldVerification };