const PostCategorySchema = (sequelize, DataTypes) => {
  const PostCategoryTable = sequelize.define('PostCategory', 
  {
    post_id: DataTypes.INTEGER,
    category_id: DataTypes.INTEGER,
  },
  {
    timestamps: false,
    tableName: 'posts_categories'
  }
  )

  PostCategoryTable.associate = (models) => {
    models.BlogPost.belongsToMany(models.Category, {
      as: 'categories',
      through: PostCategoryTable,
      foreignKey: 'post_id',
      otherKey: 'category_id'
    })
    models.Category.belongsToMany(models.BlogPost, {
      as: 'posts',
      through: PostCategoryTable,
      foreignKey: 'category_id',
      otherKey: 'post_id'
    })
  }
  
  return PostCategoryTable
}

module.exports = PostCategorySchema