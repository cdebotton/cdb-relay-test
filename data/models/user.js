export default function(sequelize, DataTypes) {
  const User = sequelize.define('User', {
    email: DataTypes.STRING,
    lastLogin: DataTypes.DATE,
  }, {
    classMethods: {
      associate(models) { // eslint-disable-line
        // associations can be defined here
      },
    },
  });

  return User;
}
