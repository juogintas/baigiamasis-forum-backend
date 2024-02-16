import QuestionModel from "../models/question.js";

const ASK_QUESTION = async (req, res) => {
  try {
    const question = new QuestionModel({
      question_title: req.body.question_title,
      question_text: req.body.question_text,
      date: req.body.date,
      is_like: false,
      is_dislike: false,
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

const LIKE_QUESTION = async (req, res) => {
  try {
    // Assuming `id` is the URL parameter containing the question's ID
    const questionId = req.params.id;

    // First, find the question by ID to get its current isLike status
    const question = await QuestionModel.findById(questionId);
    if (!question) {
      return res.status(404).json({ message: "Question not found" });
    }

    // Toggle the isLike status
    const updatedQuestion = await QuestionModel.findByIdAndUpdate(
      questionId,
      { is_like: !question.is_like },
      { new: true } // This option returns the updated document
    );

    res.status(200).json(updatedQuestion);
  } catch (error) {
    console.error("Error updating like status:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const DISLIKE_QUESTION = async (req, res) => {
  try {
    // Assuming `id` is the URL parameter containing the question's ID
    const questionId = req.params.id;

    // First, find the question by ID to get its current isLike status
    const question = await QuestionModel.findById(questionId);
    if (!question) {
      return res.status(404).json({ message: "Question not found" });
    }

    // Toggle the isLike status
    const updatedQuestion = await QuestionModel.findByIdAndUpdate(
      questionId,
      { is_dislike: !question.is_dislike },
      { new: true } // This option returns the updated document
    );

    res.status(200).json(updatedQuestion);
  } catch (error) {
    console.error("Error updating like status:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const GET_LIKET_QUESTIONS = async (req, res) => {
  const questions = await QuestionModel.find({ is_like: true });

  return res.status(200).json({ questions: questions });
};

export {
  ASK_QUESTION,
  GET_QUESTIONS,
  GET_QUESTIONS_BY_USER,
  DELETE_QUESTION,
  GET_LIKET_QUESTIONS,
  LIKE_QUESTION,
  DISLIKE_QUESTION,
};
