const express = require('express');
const { check } = require('express-validator/check');
const verifyToken = require('../../middleware/verify-token');
const verifyAdmin = require('../../middleware/verify-admin');
const { validate } = require('../../middleware/validate');
const {
  listCohortsController,
  getCohortController,
  createCohortController,
  updateCohortController,
} = require('./cohorts.controller');

const cohortsRouter = express.Router();
cohortsRouter.use(verifyToken, verifyAdmin);

cohortsRouter.get('', listCohortsController);
cohortsRouter.get('/:cohortId', getCohortController);
cohortsRouter.post(
  '',
  [
    check('name').isString(),
    check('welcome_text').isString(),
    check('thank_you_text').isString(),
  ],
  validate,
  createCohortController,
);
cohortsRouter.put(
  '/:cohortId',
  [
    check('name').isString(),
    check('welcome_text').isString(),
    check('thank_you_text').isString(),
  ],
  validate,
  updateCohortController,
);

module.exports = { cohortsRouter };
