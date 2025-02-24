const QuestionController= require("../controllers/QuestionController")
const express = require("express")
const router= express.Router()

router.get("/getQuestions",QuestionController.getQuestions)
router.post("/createQuiz",QuestionController.createQuiz)
router.post("/submitQuiz",QuestionController.submitQuiz)
module.exports=router