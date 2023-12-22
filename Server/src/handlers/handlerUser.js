const {
  createUser,
  login,
  getUsers,
} = require("../controllers/controllersUser");

const handlerPostUser = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const token = await createUser({ name, email, password });
    res.status(200).header("authorization", `Bearer ${token}`).json(token);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

const handlerLogin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const token = await login({ email, password });
    res.status(200).header("authorization", `Bearer ${token}`).json(token);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

const handlerGetUsers = async (req, res) => {
  try {
    const users = await getUsers();
    if (users) return res.status(200).json(users);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

module.exports = {
  handlerPostUser,
  handlerLogin,
  handlerGetUsers,
};
