import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  username: { type: String, requered: true, min: 3 },
  email: { type: String, requered: true, min: 3 },
  password: { type: String, requered: true, min: 3 },
});

export default mongoose.model("User", userSchema);
