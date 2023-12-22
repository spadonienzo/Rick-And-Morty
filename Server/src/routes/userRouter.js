const { Router } = require("express");
const userRouter = Router();

const {
  handlerLogin,
  handlerPostUser,
  handlerGetUsers,
} = require("../handlers/handlerUser");

const { handleFilterCharacters } = require("../handlers/handlerCharacter");

userRouter.post("/signup", handlerPostUser);
userRouter.post("/login", handlerLogin);
userRouter.get("/", handlerGetUsers);
userRouter.get("/filter", handleFilterCharacters);

module.exports = userRouter;
