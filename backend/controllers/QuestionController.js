const Question = require("../models/QuizModel");
const User = require("../models/UserModel");

const getQuestions = async (req, res) => {
  try {
    const questions = await Question.find();
    res.status(200).json({ data: questions });
  } catch (error) {
    console.error("Error fetching questions:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

const createQuiz = async (req, res) => {
  try {
    const questions = req.body.questions; 

    if (!Array.isArray(questions) || questions.length === 0) {
      return res.status(400).json({ message: "At least one question is required" });
    }

    
    const createdQuestions = await Question.insertMany(questions);

    res.status(201).json({
      message: "Quiz questions created successfully",
      data: createdQuestions,
    });
  } catch (error) {
    console.error("Error creating quiz questions:", error);
    res.status(500).json({ message: "Server Error" });
  }
};



const submitQuiz = async (req, res) => {
  try {
    const { userId, correctAnswers } = req.body;

    const user = await User.findByIdAndUpdate(
      userId,
      { correctAnswers },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({ message: "Quiz results saved!", user });
  } catch (error) {
    console.error("Error submitting quiz:", error);
    res.status(500).json({ message: "Server error" });
  }
};



module.exports = { getQuestions, createQuiz,submitQuiz };

