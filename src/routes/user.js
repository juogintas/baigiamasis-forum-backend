import express from "express";
import { SIGN_UP } from "../controllers/user.js";

const router = express.Router();

router.post("/users/signUp", SIGN_UP);

export default router;
