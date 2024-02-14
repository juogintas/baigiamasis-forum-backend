import express from "express";
import { SIGN_UP, LOG_IN } from "../controllers/user.js";

const router = express.Router();

router.post("/users/signUp", SIGN_UP);
router.post("/users/logIn", LOG_IN);

export default router;
