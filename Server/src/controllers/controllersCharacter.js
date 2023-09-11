const axios = require("axios");
const { Character } = require("../DB_connection");

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

  let dbCharacters = await Character.findAll();

  return [...apiCharacters, ...dbCharacters];
};

const getCharactersByName = async (name) => {
  const characters = getCharacters();
  const filteredCharacter = (await characters).filter((character) =>
    character.name.toLowerCase().includes(name.toLowerCase())
  );
  if (!filteredCharacter)
    return "That charachter does not exist in the database";
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
  console.log(id);
  const character = await Character.findOne({ where: { id } });
  if (!character) throw new Error("No character matches that id");
  character.destroy();
  return;
};

module.exports = {
  getCharacters,
  getCharactersByName,
  postCharacter,
  deleteCharacter,
};
