require('dotenv').config();
const Sequelize = require("sequelize");
const sql = new Sequelize(process.env.DB_DATABASE, process.env.DB_USER, process.env.DB_PASSWORD, {
  host:process.env.DB_HOST,
  dialect: process.env.DB_DIALECT,
  underscored:true,
  logging: false,
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
});
const db = {};

db.Sequelize = Sequelize;
db.sql = sql;
db.user = require('./user.model')(sql, Sequelize);
db.appel = require('./appel.model')(sql, Sequelize);

db.user.hasMany(db.appel, {
  onDelete: 'cascade',
  onUpdate: 'cascade',
  hooks: true

});
db.appel.belongsTo(db.user);


module.exports = db;
