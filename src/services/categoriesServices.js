// const { Op } = require('sequelize');
const { Category } = require('../models');

const findAllCategories = async () => {
  const allCategories = await Category.findAll();
  return allCategories;
};

const insertCategory = async (category) => {
  const result = await Category.create(category);
  return result;
};

const findCategories = async (categories) => {
  const result = await Promise.all(
    categories.map(async (item) => {
      const cat = await Category.findOne({ where: { id: item } });
      return cat;
    }),
  );
  if (result.some((item) => !item)) return { typeEr: true, messageCat: '"categoryIds" not found' };
  return { typeEr: false, result };
};

module.exports = { findAllCategories, insertCategory, findCategories };