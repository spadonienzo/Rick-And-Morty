const { Router } = require("express");
const characterRouter = Router();

const {
  saveApidata,
  handlerGetCharacters,
  handlerGetCharacterById,
  handlerPostCharacter,
  handlerDeleteCharacter,
  handlerLikeCharacter,
  handlerDislikeCharacter,
  handleGetFavorites,
} = require("../handlers/handlerCharacter");

//  GET
characterRouter.get("/save", saveApidata);
characterRouter.get("/", handlerGetCharacters);
characterRouter.get("/:id", handlerGetCharacterById);
characterRouter.get("/favorites/:id", handleGetFavorites);

// POST
characterRouter.post("/", handlerPostCharacter);
characterRouter.post("/like", handlerLikeCharacter);

// DELETE
characterRouter.delete("/dislike", handlerDislikeCharacter);
characterRouter.delete("/:id", handlerDeleteCharacter);

module.exports = characterRouter;
