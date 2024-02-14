import bcrypt from "bcryptjs";
// import jwt from "jsonwebtoken";
import UserModel from "../models/user.js";

const SIGN_UP = async (req, res) => {
  const salt = bcrypt.genSaltSync(10);

  const hash = bcrypt.hashSync(req.body.password, salt);

  const user = new UserModel({
    username: req.body.username,
    email: req.body.email,
    password: hash,
  });

  const response = await user.save();

  return res.status(201).json({ message: "User was created", user: response });
};

export { SIGN_UP };
