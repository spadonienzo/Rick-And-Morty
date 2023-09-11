require("dotenv").config();
const { Sequelize } = require("sequelize");
const { DB_USER, DB_PASSWORD, DB_HOST } = process.env;
const UserModel = require("./models/User");
const CharacterModel = require("./models/Character");
const LikesModel = require("./models/Likes");

const sequelize = new Sequelize(
  `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/rickandmorty`,
  { logging: false, native: false }
);

UserModel(sequelize);
CharacterModel(sequelize);
LikesModel(sequelize);

const { User, Character, Likes } = sequelize.models;
User.belongsToMany(Character, { through: Likes });
Character.belongsToMany(User, { through: Likes });

module.exports = {
  User,
  Character,
  conn: sequelize,
};
