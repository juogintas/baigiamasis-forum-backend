import express from "express";
import {
  ASK_QUESTION,
  GET_QUESTIONS,
  GET_QUESTIONS_BY_USER,
  DELETE_QUESTION,
  LIKE_QUESTION,
  DISLIKE_QUESTION,
  GET_LIKET_QUESTIONS,
} from "../controllers/question.js";
import auth from "../middleware/auth.js";

const router = express.Router();

router.get("/questions", auth, GET_QUESTIONS);
router.get("/questions/userId", auth, GET_QUESTIONS_BY_USER);
router.get("/questions/like:", auth, GET_LIKET_QUESTIONS);
router.post("/question", auth, ASK_QUESTION);
router.post("/question/:id/like", auth, LIKE_QUESTION);
router.post("/question/:id/dislike", auth, DISLIKE_QUESTION);
router.delete("/question/:id", auth, DELETE_QUESTION);

export default router;
