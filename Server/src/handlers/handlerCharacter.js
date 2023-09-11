const {
  getCharacters,
  getCharactersByName,
  postCharacter,
  deleteCharacter,
} = require("../controllers/controllersCharacter");

const handlerGetCharacters = async (req, res) => {
  try {
    const { name } = req.query;
    const results = name
      ? await getCharactersByName(name)
      : await getCharacters();
    return res.status(200).json(results);
  } catch (error) {
    console.log(error);
    return res.status(400).json({ error: error.message });
  }
};

const handlerGetCharacterById = async (req, res) => {
  const { id } = req.params;
  try {
    const allCharacters = await getCharacters();
    let character = allCharacters.filter((character) => character.id == id);
    res.status(200).json(character);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const handlerPostCharacter = async (req, res) => {
  const { name, status, species, gender, origin, image } = req.body;
  try {
    const newCharacter = await postCharacter({
      name,
      status,
      species,
      gender,
      origin,
      image,
    });
    res.status(200).json(newCharacter);
  } catch (error) {
    res.status(404).json({ error: error.message });
    console.log(error.message);
  }
};

const handlerDeleteCharacter = async (req, res) => {
  const { id } = req.params;
  console.log("id handler", id);
  try {
    const response = await deleteCharacter(id);
    res
      .status(200)
      .json({ message: "Character has been deleted succesfully!" });
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

module.exports = {
  handlerGetCharacters,
  handlerGetCharacterById,
  handlerPostCharacter,
  handlerDeleteCharacter,
};
