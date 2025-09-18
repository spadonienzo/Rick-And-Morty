const axios = require("axios");
const { Character, User, Likes } = require("../DB_connection");

const getCharacters = async () => {
  let i = 1;
  let characters = []; //[Promise<pending>,Promise<pending>,Promise<pending>,Promise<pending>,Promise<pending>]

  while (i < 6) {
    let apiData = await axios(
      `https://rickandmortyapi.com/api/character?page=${i}`
    );

    //El llamado a la api me devuelve una promesa, entonces lo que tengo en charactaers un array de promesas
    characters.push(apiData);
    i++;
  }

  //Aqui voy a tener un array donde va a estar la información de la api, le aplico promise all para que se resuelvan todas las promesas. Y después lo mapeo.
  characters = (await Promise.all(characters)).map((res) =>
    res.data.results.map((char) => {
      return {
        id: char.id,
        name: char.name,
        status: char.status,
        species: char.species,
        gender: char.gender,
        origin: char.origin.name,
        image: char.image,
        created: false,
      };
    })
  );

  //AL APLICAR DOS MAP OBTENGO UN ARRAY DENTRO DE OTRO ARRAY. Una forma de solucinarlo es:

  let apiCharacters = [];
  characters.map((char) => {
    apiCharacters = apiCharacters.concat(char);
  });

  // DB

  // let dbCharacters = await Character.findAll();

  return apiCharacters;

  // return dbCharacters;
};

const getCharactersByName = async (name) => {
  const characters = getCharacters();
  const filteredCharacter = (await characters).filter((character) =>
    character.name.toLowerCase().includes(name.toLowerCase())
  );

  if (!filteredCharacter)
    return "That character does not exist in the database";
  return filteredCharacter;
};

const postCharacter = async ({
  name,
  status,
  species,
  gender,
  origin,
  image,
}) => {
  const newCharacter = await Character.create({
    name,
    status,
    species,
    gender,
    origin,
    image,
  });
  return newCharacter;
};

const deleteCharacter = async (id) => {
  const character = await Character.findOne({ where: { id } });
  if (!character) throw new Error("No character matches that id");
  character.destroy();
  return;
};

const likeCharacter = async (userId, characterId) => {
  const user = await User.findByPk(userId);
  const character = await Character.findByPk(characterId);
  if (!user || !character) throw Error("User or Character not found");
  await Likes.create({ UserId: userId, CharacterId: characterId });
  return;
};

const dislikeCharacter = async (userId, characterId) => {
  const like = await Likes.findOne({
    where: { UserId: userId, CharacterId: characterId },
  });
  if (!like) throw Error("Like association not found");
  await like.destroy();
  return;
};

const getFavorites = async (id) => {
  const likedCharacters = await Likes.findAll({
    where: { UserId: id },
    include: Character,
  });

  const characters = likedCharacters.map((like) => like.Character);

  return characters;
};

const filterCharacters = async (gender, status, origin, orderBy) => {
  const characters = await Character.findAll();

  if (origin !== undefined) {
    // Convert string "true" or "false" to boolean
    origin = origin === "true";
  }

  let filteredCharacters = characters.filter((character) => {
    return (
      (!gender || character.gender === gender) &&
      (!status || character.status === status) &&
      (!origin || character.created === origin)
    );
  });

  if (origin === false) {
    filteredCharacters = filteredCharacters.filter(
      (character) => character.created !== true
    );
  }

  // Order by name
  if (orderBy === "name-asc") {
    filteredCharacters = filteredCharacters.sort((a, b) =>
      a.name.localeCompare(b.name)
    );
  } else if (orderBy === "name-desc") {
    filteredCharacters = filteredCharacters.sort((a, b) =>
      b.name.localeCompare(a.name)
    );
  }

  return filteredCharacters;
};

module.exports = {
  getCharacters,
  getCharactersByName,
  postCharacter,
  deleteCharacter,
  likeCharacter,
  dislikeCharacter,
  getFavorites,
  filterCharacters,
};
