const { Router } = require("express");
const characterRouter = Router();

const {
  handlerGetCharacters,
  handlerGetCharacterById,
  handlerPostCharacter,
  handlerDeleteCharacter,
} = require("../handlers/handlerCharacter");

//  GET
characterRouter.get("/", handlerGetCharacters);
characterRouter.get("/:id", handlerGetCharacterById);

// POST
characterRouter.post("/", handlerPostCharacter);

// DELETE
characterRouter.delete("/:id", handlerDeleteCharacter);

module.exports = characterRouter;
