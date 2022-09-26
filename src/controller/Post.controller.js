const PostServices = require('../services/postServices');

const getAllPosts = async (req, res) => {
  const allPosts = await PostServices.findAllPosts();
  return res.status(200).json(allPosts);
};

const getOnePost = async (req, res) => {
  const { id } = req.params;
  const post = await PostServices.findOnePost(id);
  if (!post) {
 return res.status(404).json({
    message: 'Post does not exist',
  }); 
}
  res.status(200).json(post);
};

module.exports = { getAllPosts, getOnePost };