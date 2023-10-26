const { Router } = require("express");
const userRouter = Router();

const {
  handlerLogin,
  handlerPostUser,
  handlerGetUsers,
} = require("../handlers/handlerUser");

userRouter.post("/signup", handlerPostUser);
userRouter.post("/login", handlerLogin);

userRouter.get("/", handlerGetUsers);

module.exports = userRouter;
