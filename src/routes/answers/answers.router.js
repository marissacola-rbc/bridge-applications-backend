const express = require('express');
const { check } = require('express-validator/check');
const verifyToken = require('../../middleware/verify-token');
const { validate } = require('../../middleware/validate');
const {
  listAnswersController,
  getAnswerController,
  createAnswerController,
  updateAnswerController,
} = require('./answers.controller');
const Questions = require('../questions/questions.model');
const Answers = require('./answers.model');

const answersRouter = express.Router();
answersRouter.use(verifyToken);

answersRouter.get('', listAnswersController);
answersRouter.get('/:answerId', getAnswerController);
answersRouter.post(
  '',
  [
    check('answer_text').isString(),
    check('question_id').custom(value => {
      return Questions.getQuestion(value)
        .then(questions => {
          if (questions.length === 0) {
            return Promise.reject('must be a valid question id');
          }
        })
        .catch(err => Promise.reject());
    }),
  ],
  validate,
  createAnswerController,
);
answersRouter.put(
  '/:answerId',
  [
    check('answer_text').isString(),
    check('answerId').custom(value => {
      return Answers.getAnswer(value)
        .then(answers => {
          if (answers.length === 0) {
            return Promise.reject('must be a valid answer id');
          }
        })
        .catch(err => Promise.reject());
    }),
  ],
  validate,
  updateAnswerController,
);

module.exports = { answersRouter };
