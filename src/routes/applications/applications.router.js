const express = require('express');
const { check } = require('express-validator/check');
const verifyUser = require('../../middleware/verify-user');
const { validate } = require('../../middleware/validate');

const {
  listApplicationsController,
  getApplicationController,
  createApplicationController,
  updateApplicationController,
} = require('./applications.controller');
const Applications = require('./applications.model');
const Cohorts = require('../cohorts/cohorts.model');
const Users = require('../users/users.model');

const applicationsRouter = express.Router();
applicationsRouter.use(verifyUser);

applicationsRouter.get('', listApplicationsController);
applicationsRouter.get('/:applicationId', getApplicationController);
applicationsRouter.post(
  '',
  [
    check('cohort_id').exists(),
    check('cohort_id').custom(value => {
      return Cohorts.getCohort(value).then(result => {
        if (result.length === 0) {
          return Promise.reject('must be a valid cohort');
        }
      });
    }),
    check('user_id').exists(),
    check('user_id').custom(value => {
      return Users.getUser(value).then(result => {
        if (result.length === 0) {
          return Promise.reject('must be a valid user');
        }
      });
    }),
    check('user_id').custom((value, { req }) => {
      const cohort_id = req.body.cohort_id;
      return Applications.getApplications()
        .where({ user_id: value, cohort_id })
        .then(result => {
          if (result.length !== 0) {
            return Promise.reject(
              'user already submitted an application for this cohort',
            );
          }
        });
    }),
  ],
  validate,
  createApplicationController,
);
applicationsRouter.put('/:applicationId', updateApplicationController);

module.exports = { applicationsRouter };
