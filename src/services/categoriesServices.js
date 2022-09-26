const { Category } = require('../models');

const findAllCategories = async () => {
  const allCategories = await Category.findAll();
  return allCategories;
};

const insertCategory = async (category) => {
  const result = await Category.create(category);
  console.log(result);
  return result;
};

module.exports = { findAllCategories, insertCategory };