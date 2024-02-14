import express from "express";
import mongoose from "mongoose";
import "dotenv/config";

const app = express();

app.use(express.json());

mongoose

  .connect(process.env.MONGO_CONNECTION)

  .then(() => console.log("Connected to DB!"))
  .catch((err) => {
    console.log(err);
  });

app.get("/", function (req, res) {
  res.send("Hello World");
});

app.listen(3001);
