const express = require('express');
const { check } = require('express-validator/check');
const {
  listCohortsController,
  getCohortController,
  createCohortController,
  updateCohortController,
} = require('./cohorts.controller');

const cohortsRouter = express.Router();

cohortsRouter.get('', listCohortsController);
cohortsRouter.get('/:cohortId', getCohortController);
cohortsRouter.post(
  '',
  [
    check('name').isString(),
    check('welcome_text').isString(),
    check('thank_you_text').isString(),
  ],
  createCohortController,
);
cohortsRouter.put(
  '/:cohortId',
  [
    check('name').isString(),
    check('welcome_text').isString(),
    check('thank_you_text').isString(),
  ],
  updateCohortController,
);

module.exports = { cohortsRouter };
