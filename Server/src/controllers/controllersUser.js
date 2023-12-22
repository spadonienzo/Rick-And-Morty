const { User } = require("../DB_connection");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
require("dotenv").config();
const { ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET } = process.env;

const createUser = async ({ name, email, password }) => {
  const passwordHashed = await bcrypt.hash(password, 8);
  const [user, created] = await User.findOrCreate({
    where: { email },
    defaults: {
      name,
      email,
      password: passwordHashed,
    },
  });
  if (!created) throw new Error("User already exists");
  const token = jwt.sign(
    {
      id: user.id,
      name: user.name,
      email: user.email,
      password: user.password,
    },
    ACCESS_TOKEN_SECRET,
    { expiresIn: 86400 }
  );
  return token;
};

const login = async ({ email, password }) => {
  if (!email || !password) throw Error("Missing data");
  const user = await User.findOne({ where: { email } });
  const isValidPassword = await bcrypt.compare(password, user.password);
  if (!isValidPassword || user.email !== email)
    throw Error("Wrong user or password");

  const token = jwt.sign(
    {
      id: user.id,
      name: user.name,
      email: user.email,
      password: user.password,
    },
    ACCESS_TOKEN_SECRET,
    { expiresIn: 86400 }
  );
  return token;
};

const getUsers = async () => {
  const users = await User.findAll();
  if (!users) throw Error("No users found in the database");
  return users;
};

module.exports = {
  login,
  createUser,
  getUsers,
};
