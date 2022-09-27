const CategoriesServices = require('../services/categoriesServices');

const getAllCategories = async (req, res) => {
  const allCategories = await CategoriesServices.findAllCategories();
  console.log('categorias', allCategories);
  return res.status(200).json(allCategories);
};

const postCategory = async (req, res) => {
  const category = req.body;
  if (!category.name) {
    return res.status(400).json({ message: '"name" is required' });
  }
  const newCategory = await CategoriesServices.insertCategory(category);
  return res.status(201).json(newCategory);
};

module.exports = { getAllCategories, postCategory };