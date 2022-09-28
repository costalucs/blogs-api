const { Op } = require('sequelize');
const { BlogPost, User, Category } = require('../models');

const findAllPosts = async () => {
  const allPosts = await BlogPost.findAll({
    include: [
      { model: User, as: 'user', attributes: { exclude: ['password'] } },
      { model: Category, as: 'categories', through: { attributes: [] } },
    ],
  });
  return allPosts;
};

// ref: https://sequelize.org/docs/v6/core-concepts/model-querying-basics/#logical-combinations-with-operators
const findAllPostsByQuery = async (query) => {
  const allPosts = await BlogPost.findAll({
    where: {
      [Op.or]: [{ title: { [Op.like]: `%${query}%` } }, {
        content: { [Op.like]: `%${query}%` } },
      ],
    },
    include: [
      {
        model: User, as: 'user', attributes: { exclude: ['password'] },
      },
      {
        model: Category, as: 'categories', through: { attributes: [] },
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

const destroyPost = async (id) => {
  await BlogPost.destroy({ where: { id } });
};

const editPost = async (id, title, content) => {
  await BlogPost.update({ title, content }, { where: { id } });
};

module.exports = { 
  findAllPosts, findOnePost, createPost, destroyPost, findAllPostsByQuery, editPost };