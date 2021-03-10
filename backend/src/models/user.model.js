module.exports = (sql, Sequelize) => {
  const User = sql.define('Users', {
    nomcomplet: {
      type: Sequelize.STRING,
      allowNull: true,
      defaultValue: 'n/a'
    },
    pseudo: {
      type: Sequelize.STRING,
      allowNull: false
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false
    },
    phone: {
      type: Sequelize.STRING,
      allowNull: true,
      defaultValue: 'n/a'
    },
    role: {
      type: Sequelize.STRING,
      allowNull: false
    },
    avatar: {
      type: Sequelize.STRING,
      allowNull: true,
      defaultValue: 'https://via.placeholder.com/100.png'
    },
    statut: {
      type: Sequelize.ENUM,
      values: ['1', '0'],
      allowNull: true,
      defaultValue: '0'

    }
  });

  return User;
};
