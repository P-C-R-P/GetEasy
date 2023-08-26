const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');

const config = {
  host: 'localhost',
  dialect: 'postgres',
};

const sequelize = new Sequelize(
  'get-easy',
  'postgres',
  `${process.env.POSTGRESQL_KEY}`,
  config
);
const db = {};

const files = fs.readdirSync(__dirname);

for (const file of files) {
  if (file !== 'index.js') {
    const model = require(path.join(__dirname, file))(
      sequelize,
      Sequelize.DataTypes
    );
    db[model.name] = model;
  }
}

for (const model in db) {
  if (db[model].associate) db[model].associate(db);
}

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
