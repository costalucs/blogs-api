const UserSchema = (sequelize, DataTypes) => {
  const UserTable = sequelize.define('User', {
    display_name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    image: DataTypes.STRING,
  })
  return UserTable
}

module.exports = UserSchema