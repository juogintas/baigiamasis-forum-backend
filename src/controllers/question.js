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
  try {
    const questions = await QuestionModel.find();
    return res.status(200).json({ questions: questions });
  } catch (error) {
    console.error("Error fetching questions:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const GET_QUESTIONS_BY_USER = async (req, res) => {
  try {
    const questions = await QuestionModel.find({ user_id: req.body.user_id });
    return res.status(200).json({ questions: questions });
  } catch (error) {
    console.error("Error fetching questions by user:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const LIKE_QUESTION = async (req, res) => {
  try {
    const questionId = req.params.id;
    const question = await QuestionModel.findById(questionId);
    if (!question) {
      return res.status(404).json({ message: "Question not found" });
    }
    const updatedQuestion = await QuestionModel.findByIdAndUpdate(
      questionId,
      { is_like: !question.is_like },
      { new: true }
    );
    res.status(200).json(updatedQuestion);
  } catch (error) {
    console.error("Error updating like status:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const DISLIKE_QUESTION = async (req, res) => {
  try {
    const questionId = req.params.id;
    const question = await QuestionModel.findById(questionId);
    if (!question) {
      return res.status(404).json({ message: "Question not found" });
    }
    const updatedQuestion = await QuestionModel.findByIdAndUpdate(
      questionId,
      { is_dislike: !question.is_dislike },
      { new: true }
    );
    res.status(200).json(updatedQuestion);
  } catch (error) {
    console.error("Error updating dislike status:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const GET_LIKED_QUESTIONS = async (req, res) => {
  try {
    const questions = await QuestionModel.find({ is_like: true });
    return res.status(200).json({ questions: questions });
  } catch (error) {
    console.error("Error fetching liked questions:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const GET_DISLIKED_QUESTIONS = async (req, res) => {
  try {
    const questions = await QuestionModel.find({ is_dislike: true });
    return res.status(200).json({ questions: questions });
  } catch (error) {
    console.error("Error fetching liked questions:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const DELETE_QUESTION = async (req, res) => {
  try {
    const question = await QuestionModel.findByIdAndDelete(req.params.id);
    if (!question) {
      return res.status(404).json({ message: "Question not found" });
    }
    return res.status(200).json({ message: "Question deleted successfully" });
  } catch (error) {
    console.error("Error deleting question:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export {
  ASK_QUESTION,
  GET_QUESTIONS,
  GET_QUESTIONS_BY_USER,
  LIKE_QUESTION,
  DISLIKE_QUESTION,
  GET_LIKED_QUESTIONS,
  GET_DISLIKED_QUESTIONS,
  DELETE_QUESTION,
};
