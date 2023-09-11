const { createUser, login } = require("../controllers/controllersUser");

const handlerPostUser = async (req, res) => {
  console.log(req.body);
  const { name, email, password } = req.body;
  try {
    const newUser = await createUser({ name, email, password });
    res.status(200).json(newUser);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

const handlerLogin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await login({ email, password });
    if (user) return res.status(200).json({ access: true, user });
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

module.exports = {
  handlerPostUser,
  handlerLogin,
};
