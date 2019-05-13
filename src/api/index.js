const express = require('express');

const { healthRouter } = require('../routes/health/health.router');
const { usersRouter } = require('../routes/users/users.router');
const { cohortsRouter } = require('../routes/cohorts/cohorts.router');
const { questionsRouter } = require('../routes/questions/questions.router');
const { answersRouter } = require('../routes/answers/answers.router');
const {
  applicationsRouter,
} = require('../routes/applications/applications.router');
const {
  identifyingInfoRouter,
} = require('../routes/identifyingInfo/identifyingInfo.router');

const router = express.Router();
router.use('/health', healthRouter);
router.use('/users', usersRouter);
router.use('/cohorts', cohortsRouter);
router.use('/questions', questionsRouter);
router.use('/answers', answersRouter);
router.use('/applications', applicationsRouter);
router.use('/identifyingInfo', identifyingInfoRouter);

module.exports = router;
