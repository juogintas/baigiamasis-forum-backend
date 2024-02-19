import express from "express";
import {
  ASK_QUESTION,
  GET_QUESTIONS,
  GET_QUESTIONS_BY_USER,
  GET_LIKED_QUESTIONS, // Correct function name
  DELETE_QUESTION,
  LIKE_QUESTION,
  DISLIKE_QUESTION,
} from "../controllers/question.js";
import auth from "../middleware/auth.js";

const router = express.Router();

router.get("/questions", auth, GET_QUESTIONS);
router.get("/questions/userId", auth, GET_QUESTIONS_BY_USER);
router.get("/questions/liked", auth, GET_LIKED_QUESTIONS); // Correct path and function
router.post("/question", auth, ASK_QUESTION);
router.post("/question/:id/like", auth, LIKE_QUESTION);
router.post("/question/:id/dislike", auth, DISLIKE_QUESTION);
router.delete("/question/:id", auth, DELETE_QUESTION);

export default router;
