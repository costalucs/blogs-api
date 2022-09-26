const { Category } = require('../models');

const findAllCategories = async () => {
  const allCategories = await Category.findAll();
  return allCategories;
};

module.exports = { findAllCategories };