import express from "express";
import mongoose from "mongoose";
import "dotenv/config";
import cors from "cors";
import userRouter from "../backend/src/routes/user.js";
import questionRouter from "../backend/src/routes/question.js";

const app = express();

app.use(express.json());
app.use(cors());

mongoose

  .connect(process.env.MONGO_CONNECTION)

  .then(() => console.log("Connected to DB!"))
  .catch((err) => {
    console.log(err);
  });

app.use(userRouter);
app.use(questionRouter);

app.listen(process.env.PORT);
