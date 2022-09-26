const PostServices = require('../services/postServices');

const getAllPosts = async (req, res) => {
  const allPosts = await PostServices.findAllPosts();
  return res.status(200).json(allPosts);
};

module.exports = { getAllPosts };