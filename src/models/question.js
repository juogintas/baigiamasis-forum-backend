import mongoose from "mongoose";

const questionSchema = mongoose.Schema({
  question_title: { type: String, required: true, min: 3 },
  question_text: { type: String, required: true, min: 3 },
  date: { type: String, required: true, min: 3 },
  user_id: { type: String, required: true },
  is_like: { type: Boolean, required: true },
  is_dislike: { type: Boolean, required: true },
});

export default mongoose.model("Question", questionSchema);
