const { Router } = require("express");

const userRouter = require("./userRouter");
const characterRouter = require("./characterRouter");

const mainRouter = Router();

mainRouter.use("/users", userRouter);
mainRouter.use("/characters", characterRouter);

module.exports = mainRouter;
