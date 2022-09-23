const UserSchema = (sequelize, DataTypes) => {
  const UserTable = sequelize.define('User', {
    id: DataTypes.INTEGER,
    display_name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    image: DataTypes.STRING,
  })

  UserTable.associate = (models) => {
    UserTable.hasMany(models.BlogPost, {
      foreignKey: 'user_id', as: 'blogposts'
    });
  }
  return UserTable
}

module.exports = UserSchema