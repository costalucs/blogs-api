const { PostCategory } = require('../models');

const creatPostCategory = async (postId, categoryId) => {
  const newPostCategory = await PostCategory.create({ postId, categoryId });
  return newPostCategory;
};

module.exports = { creatPostCategory };