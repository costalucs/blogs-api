const BlogPostSchema = (sequelize, DataTypes) => {
  const BlogPostTable = sequelize.define('BlogPost', {
    id: DataTypes.INTEGER,
    title: DataTypes.STRING,
    content: DataTypes.STRING,
    user_id: {
      type: DataTypes.INTEGER, 
      foreignKey: true,
  },
    published: DataTypes.DATE,
    updated: DataTypes.DATE,
  })

  BlogPostTable.associate = (models) => {
    BlogPostTable.belongsTo(models.User, {
      foreignKey: 'user_id', as: 'user'
    });
  }
  return BlogPostTable
}

module.exports = BlogPostSchema