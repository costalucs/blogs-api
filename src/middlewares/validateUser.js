const jwt = require('jsonwebtoken');
const UserServices = require('../services/userServices');
const PostServices = require('../services/postServices');

const secret = process.env.JWT_SECRET || 'suaSenhaSecreta';

module.exports = async (req, res, next) => {
  const { id } = req.params;
  const token = req.header('Authorization');

  const { email } = jwt.verify(token, secret);
  const post = await PostServices.findOnePost(id);
  
  if (!post) {
    return res.status(404).json({ message: 'Post does not exist' });
  }

  const { user: { dataValues } } = await UserServices.findUser(email);

  if (dataValues.id !== post.dataValues.userId) {
    return res
      .status(401).json({ message: 'Unauthorized user' });
  }

  next();
};