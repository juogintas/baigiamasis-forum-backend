import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
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

const LOG_IN = async (req, res) => {
  const user = await UserModel.findOne({ username: req.body.username });

  if (!user) {
    return res.status(401).json({ message: "Wrong username" });
  }

  const isPasswordMatch = bcrypt.compareSync(req.body.password, user.password);

  if (!isPasswordMatch) {
    return res.status(401).json({ message: "Wrong password" });
  }

  const token = jwt.sign(
    { username: user.username.id, _id: user._id },
    process.env.JWT_SECRET,
    { expiresIn: "2h" }
  );

  return res.status(200).json({ jwt: token });
};

export { SIGN_UP, LOG_IN };
