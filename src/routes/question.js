import express from "express";
import {
  ASK_QUESTION,
  GET_QUESTIONS,
  GET_QUESTIONS_BY_USER,
  DELETE_QUESTION,
} from "../controllers/question.js";
import auth from "../middleware/auth.js";

const router = express.Router();

router.post("/question", auth, ASK_QUESTION);
router.get("/questions", auth, GET_QUESTIONS);
router.get("/questions/user", auth, GET_QUESTIONS_BY_USER);
router.delete("/question/:id", auth, DELETE_QUESTION);

export default router;
