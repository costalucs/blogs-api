const PostCategorySchema = (sequelize, DataTypes) => {
  const PostCategoryTable = sequelize.define('PostCategory', 
  {
    post_id: DataTypes.INTEGER,
    category_id: DataTypes.INTEGER,
  },
  {
    timestamps: false,
    tableName: 'user_books'
  }
  )

  PostCategoryTable.associate = (models) => {
    models.BlogPost.belongsToMany(models.Category, {
      as: 'posts',
      through: PostCategoryTable,
      foreignKey: 'id',
      otherKey: 'post_id'
    })
    models.Category.belongsToMany(models.BlogPost, {
      as: 'categories',
      through: PostCategoryTable,
      foreignKey: 'id',
      otherKey: 'category_id'
    })
  }
  
  return PostCategoryTable
}

module.exports = PostCategorySchema