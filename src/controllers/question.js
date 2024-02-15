import QuestionModel from "../models/question.js";

const ASK_QUESTION = async (req, res) => {
  try {
    const question = new QuestionModel({
      question_title: req.body.question_title,
      question_text: req.body.question_text,
      date: req.body.date,
      user_id: req.body.user_id,
    });

    const response = await question.save();

    return res
      .status(201)
      .json({ message: "Thank you for your question", response });
  } catch (error) {
    console.error("Error in ASK_QUESTION:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const GET_QUESTIONS = async (req, res) => {
  const questions = await QuestionModel.find();
  return res.status(200).json({ questions: questions });
};

const GET_QUESTIONS_BY_USER = async (req, res) => {
  const questions = await QuestionModel.find({ user_id: req.body.user_id });
  return res.status(200).json({ questions: questions });
};

const DELETE_QUESTION = async (req, res) => {
  const question = await QuestionModel.findByIdAndDelete(req.params.id);
  return res.status(200).json({ question: question });
};

export { ASK_QUESTION, GET_QUESTIONS, GET_QUESTIONS_BY_USER, DELETE_QUESTION };
