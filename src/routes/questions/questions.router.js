const express = require('express');
const { check } = require('express-validator/check');
const verifyToken = require('../../middleware/verify-token');
const { validate } = require('../../middleware/validate');
const {
  listQuestionsController,
  getQuestionController,
  createQuestionController,
  updateQuestionController,
} = require('./questions.controller');

const questionsRouter = express.Router();
questionsRouter.use(verifyToken);

questionsRouter.get('', listQuestionsController);
questionsRouter.get('/:questionId', getQuestionController);
questionsRouter.post(
  '',
  [
    check('question_text').isString(),
    check('question_type')
      .isString()
      .isIn(['checkbox', 'radio', 'text']),
  ],
  validate,
  createQuestionController,
);
questionsRouter.put(
  '/:questionId',
  [
    check('question_text').isString(),
    check('question_type')
      .isString()
      .isIn(['checkbox', 'radio', 'text']),
  ],
  validate,
  updateQuestionController,
);

module.exports = { questionsRouter };
