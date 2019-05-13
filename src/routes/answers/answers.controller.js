const Answers = require('./answers.model');
const { NotFoundError } = require('../../utils/errors');

const listAnswersController = async (req, res, next) => {
  try {
    const answers = await Answers.getAnswers();
    return res.json(answers);
  } catch (error) {
    next(error);
  }
};

const getAnswerController = async (req, res, next) => {
  try {
    const answer = await Answers.getAnswer(req.params.answerId);
    if (answer.length) {
      return res.json(answer[0]);
    } else {
      throw new NotFoundError('answer not found');
    }
  } catch (error) {
    next(error);
  }
};

const createAnswerController = async (req, res, next) => {
  try {
    const { answer_text, question_id } = req.body;
    const newAnswer = await Answers.createAnswer({
      answer_text,
      question_id,
    });

    return res.json(newAnswer);
  } catch (error) {
    next(error);
  }
};

const updateAnswerController = async (req, res, next) => {
  try {
    const { answer_text } = req.body;
    const newAnswer = await Answers.updateAnswer({
      answerId: req.params.answerId,
      answer_text,
    });

    if (newAnswer.length) {
      return res.json(newAnswer);
    } else {
      throw new NotFoundError('answer not found');
    }
  } catch (error) {
    next(error);
  }
};

module.exports = {
  listAnswersController,
  getAnswerController,
  createAnswerController,
  updateAnswerController,
};
