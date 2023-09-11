const { Router } = require("express");
const userRouter = Router();

const { handlerLogin, handlerPostUser } = require("../handlers/handlerUser");

userRouter.post("/signup", handlerPostUser);
userRouter.post("/login", handlerLogin);

module.exports = userRouter;
