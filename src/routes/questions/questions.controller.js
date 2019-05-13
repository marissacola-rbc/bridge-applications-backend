const { validationResult } = require('express-validator/check');
const Questions = require('./questions.model');
const { NotFoundError } = require('../../utils/errors');

const listQuestionsController = async (req, res, next) => {
  try {
    const questions = await Questions.getQuestions();
    return res.json(questions);
  } catch (error) {
    next(error);
  }
};

const getQuestionController = async (req, res, next) => {
  try {
    const question = await Questions.getQuestion(req.params.questionId);
    if (question.length) {
      return res.json(question[0]);
    } else {
      throw new NotFoundError('question not found');
    }
  } catch (error) {
    next(error);
  }
};

const createQuestionController = async (req, res, next) => {
  try {
    const { question_text, question_type } = req.body;
    const newQuestion = await Questions.createQuestion({
      question_text,
      question_type,
    });

    return res.json(newQuestion);
  } catch (error) {
    next(error);
  }
};

const updateQuestionController = async (req, res, next) => {
  try {
    const { question_text, question_type } = req.body;
    const newQuestion = await Questions.updateQuestion(req.params.questionId, {
      question_text,
      question_type,
    });

    if (newQuestion.length) {
      return res.json(newQuestion);
    } else {
      throw new NotFoundError('question not found');
    }
  } catch (error) {
    next(error);
  }
};

module.exports = {
  listQuestionsController,
  getQuestionController,
  createQuestionController,
  updateQuestionController,
};
