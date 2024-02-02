require("dotenv").config();
const { PORT } = process.env;
const express = require("express");
const server = express();
const router = require("./routes/index");
const { conn } = require("./DB_connection");

server.use(express.json());
server.use((req, res, next) => {
  res.header(
    "Access-Control-Allow-Origin",
    "https://rick-and-morty-espadoni.vercel.app"
  );
  res.header("Access-Control-Allow-Credentials", "true");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
  next();
});

server.use("/", router);

conn
  .sync({ alter: true })
  .then(() => {
    server.listen(PORT, () => {
      console.log(`Server listening on port: ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
