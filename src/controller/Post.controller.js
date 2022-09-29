const jwt = require('jsonwebtoken');
const PostServices = require('../services/postServices');
const UserServices = require('../services/userServices');
const PostCategoryServices = require('../services/postCategoryServices');
const CategoriesServices = require('../services/categoriesServices');
const verifyPost = require('../utils/verifyPost');

const secret = process.env.JWT_SECRET || 'suaSenhaSecreta';

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

const insertPost = async (req, res) => {
  const token = req.header('Authorization');
  const post = req.body;
  const { type, message } = verifyPost(post);

  if (type) return res.status(400).json({ message });

  const { title, content } = req.body;
  const { typeEr, messageCat } = await CategoriesServices
    .findCategories(post.categoryIds);
  if (typeEr) return res.status(400).json({ message: messageCat });

  const { email } = jwt.verify(token, secret);
  const { user: { id } } = await UserServices.findUser(email);
  const newPost = await PostServices.createPost({ title, content, id });

  await Promise.all(
    post.categoryIds.map(async (item) => {
      await PostCategoryServices.creatPostCategory(newPost.id, item);
    }),
  );

  return res.status(201).json(newPost);
};

const deletePostById = async (req, res) => {
  const { id } = req.params;

  await PostServices.destroyPost(id);

  return res.status(204).json();
};

const searchPost = async (req, res) => {
  const { q } = req.query;
  const post = await PostServices.findAllPostsByQuery(q);
  return res.status(200).json(post);
};

const editPost = async (req, res) => {
  const { id } = req.params;
  const { title, content } = req.body;

  if (!title || !content) {
    return res
      .status(400).json({ message: 'Some required fields are missing' });
  }

  await PostServices.editPost(id, title, content);

  const updated = await PostServices.findOnePost(id);

  return res.status(200).json(updated);
};

module.exports = { getAllPosts, getOnePost, insertPost, deletePostById, searchPost, editPost };