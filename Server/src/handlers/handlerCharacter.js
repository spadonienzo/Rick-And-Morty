const { Character } = require("../DB_connection");

const {
  getCharacters,
  getCharactersByName,
  postCharacter,
  deleteCharacter,
  likeCharacter,
  dislikeCharacter,
  getFavorites,
  filterCharacters,
} = require("../controllers/controllersCharacter");

const saveApidata = async (req, res) => {
  try {
    const response = await getCharacters();
    await Character.bulkCreate(response);
    res.status(200).json({ message: "Creacion exitosa" });
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

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
  console.log(req.body);
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
    console.log(error);
  }
};

const handlerDeleteCharacter = async (req, res) => {
  const { id } = req.params;
  try {
    const response = await deleteCharacter(id);
    res
      .status(200)
      .json({ message: "Character has been deleted succesfully!" });
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

const handlerLikeCharacter = async (req, res) => {
  const { userId, characterId } = req.body; // Assuming the IDs are sent in the request body

  try {
    const response = likeCharacter(userId, characterId);
    res.status(200).json({ message: "Character liked successfully" });
  } catch (error) {
    console.error(error);
    res.status(404).json({ error: error.message });
  }
};

const handlerDislikeCharacter = async (req, res) => {
  const { userId, characterId } = req.body;
  console.log(userId, characterId);
  try {
    const response = dislikeCharacter(userId, characterId);
    res.status(200).json({ message: "Character disliked successfully" });
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

const handleGetFavorites = async (req, res) => {
  const { id } = req.params;
  try {
    const response = await getFavorites(id);
    res.status(200).json(response);
  } catch (error) {
    console.log(error);
    res.status(404).json({ error: error.message });
  }
};

const handleFilterCharacters = async (req, res) => {
  const { gender, status, origin, orderBy } = req.query;
  try {
    const response = await filterCharacters(gender, status, origin, orderBy);
    return res.status(200).json(response);
  } catch (error) {
    console.log(error.message);
    return res.status(404).json({ error: error.message });
  }
};

module.exports = {
  saveApidata,
  handlerGetCharacters,
  handlerGetCharacterById,
  handlerPostCharacter,
  handlerDeleteCharacter,
  handlerLikeCharacter,
  handlerDislikeCharacter,
  handleGetFavorites,
  handleFilterCharacters,
};
