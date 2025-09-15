require("dotenv").config();
const { Sequelize } = require("sequelize");
const UserModel = require("./models/User");
const CharacterModel = require("./models/Character");
const LikesModel = require("./models/Likes");

// Conexión usando DATABASE_URL y forzando SSL (Render lo requiere)
const sequelize = new Sequelize(process.env.DATABASE_URL, {
  logging: false,
  native: false,
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
});

UserModel(sequelize);
CharacterModel(sequelize);
LikesModel(sequelize);

const { User, Character, Likes } = sequelize.models;
User.belongsToMany(Character, { through: Likes });
Character.belongsToMany(User, { through: Likes });
Likes.belongsTo(Character, { foreignKey: "CharacterId" });

module.exports = { User, Character, Likes, conn: sequelize };

