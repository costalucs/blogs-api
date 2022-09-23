const CategorySchema = (sequelize, DataTypes) => {
  const CategoryTable = sequelize.define('Category', {
    id: DataTypes.INTEGER,
    name: DataTypes.STRING,
  })
  return CategoryTable
}

module.exports = CategorySchema