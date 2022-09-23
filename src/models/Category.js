const CategorySchema = (sequelize, DataTypes) => {
  const CategoryTable = sequelize.define('Category', {
    name: DataTypes.STRING,
  }, {tableName: 'categories'})
  return CategoryTable
}

module.exports = CategorySchema