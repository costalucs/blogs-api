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
  return allPosts;
};

const findOnePost = async (id) => {
  const post = await BlogPost.findOne({
    where: { id },
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
  return post;
};

const createPost = async ({ title, content, id }) => {
  const post = await BlogPost.create({ title, content, userId: id });
  console.log(post);
  return post.dataValues;
};

module.exports = { findAllPosts, findOnePost, createPost };