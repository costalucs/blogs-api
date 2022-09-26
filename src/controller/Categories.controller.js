const CategoriesServices = require('../services/categoriesServices');

const getAllCategories = async (req, res) => {
  const allCategories = await CategoriesServices.findAllCategories();
  console.log('categorias', allCategories);
  return res.status(200).json(allCategories);
};

module.exports = { getAllCategories };