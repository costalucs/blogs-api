const { BlogPost, User, Category } = require('../models');

const findAllPosts = async () => {
  const allPosts = await BlogPost.findAll({
    include: [
      {
        model: User,
        as: 'user',
        attributes: {
          exclude: ['password'],
        },
      },
      {
        model: Category,
        as: 'categories',
        through: { attributes: [] },
      },
    ],
  });
  console.log(allPosts);
  return allPosts;
};
module.exports = { findAllPosts };