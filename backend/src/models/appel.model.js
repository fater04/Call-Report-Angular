module.exports = (sql, Sequelize) => {
  const Appel = sql.define('Appels', {
    telephone: {
      type: Sequelize.STRING,
      allowNull: true,
      defaultValue: 'n/a'
    },
    nom: {
      type: Sequelize.STRING,
      allowNull: true,
      defaultValue: ''
    },
    prenom: {
      type: Sequelize.STRING,
      allowNull: true,
      defaultValue: ''
    },
    institution: {
      type: Sequelize.STRING,
      allowNull: true,
      defaultValue: ''
    },
    identite: {
      type: Sequelize.STRING,
      allowNull: true,
      defaultValue: 'n/a'
    },
    question: {
      type: Sequelize.STRING,
      allowNull: true,
      defaultValue: ''
    },
    action: {
      type: Sequelize.STRING,
      allowNull: true,
      defaultValue: ''
    },
    remarque: {
      type: Sequelize.STRING,
      allowNull: true,
      defaultValue: ''
    },
    suivi: {
      type: Sequelize.STRING,
      allowNull: true,
      defaultValue: ''
    },
    suggestion: {
      type: Sequelize.STRING,
      allowNull: true,
      defaultValue: ''
    },

  });

  return Appel;
};
