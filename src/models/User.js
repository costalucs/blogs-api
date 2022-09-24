const UserSchema = (sequelize, DataTypes) => {
  const UserTable = sequelize.define('User', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    display_name: {
      type: DataTypes.STRING,
    },
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    image: DataTypes.STRING,
  },{
    timestamps: false,
    tableName: 'users',
  })

  UserTable.associate = (models) => {
    UserTable.hasMany(models.BlogPost, {
      foreignKey: 'user_id', as: 'blogposts'
    });
  }
  return UserTable
}

module.exports = UserSchema