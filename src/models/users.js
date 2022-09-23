const UsersSchema = (sequelize, DataTypes) => {
  const UserTable = sequelize.define('Users', {
    displayName: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    password: DataTypes.STRING,
    image: DataTypes.STRING,
  }, {
    tableName: users,
    underscored: true,
  })
  return UserTable
}

module.exports = UsersSchema