const { User } = require("../DB_connection");

const login = async ({ email, password }) => {
  if (!email || !password) throw Error("Missing data");
  const user = await User.findOne({ where: { email } });
  if (!user) throw Error("User not found");
  if (user.password === password) {
    return { name: user.name, id: user.id, password: user.password };
  } else {
    throw Error("Invalid password");
  }
};

const createUser = async ({ name, email, password }) => {
  if (!email || !password || !name) throw Error("Faltan datos");
  const user = await User.create({ name, email, password });
  return user;
};

module.exports = {
  login,
  createUser,
};
