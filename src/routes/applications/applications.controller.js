const { logger } = require('../../utils/logger');
const { NotFoundError } = require('../../utils/errors');

const Applications = require('./applications.model');
const Users = require('../users/users.model');
const Cohorts = require('../cohorts/cohorts.model');
const {
  invokeEmailService,
  invokeSlackService,
} = require('./applications.services');

const listApplicationsController = async (req, res, next) => {
  try {
    const applications = await Applications.getApplications();
    return res.json(applications);
  } catch (error) {
    next(error);
  }
};

const getApplicationController = async (req, res, next) => {
  try {
    const applications = await Applications.getApplication(
      req.params.applicationId,
    );
    if (applications.length) {
      return res.json(applications[0]);
    } else {
      throw new NotFoundError('application not found');
    }
  } catch (error) {
    next(error);
  }
};

const createApplicationController = async (req, res, next) => {
  try {
    const { user_id, cohort_id, accepted_test, accepted_cohort } = req.body;
    const newApplication = await Applications.createApplication({
      user_id,
      cohort_id,
      accepted_test,
      accepted_cohort,
    });

    return res.json(newApplication);
  } catch (error) {
    next(error);
  }
};

const updateApplicationController = async (req, res, next) => {
  try {
    const { user_id, cohort_id, accepted_test, accepted_cohort } = req.body;
    const applicationId = req.params.applicationId;
    const updatedApplication = await Applications.updateApplication(
      applicationId,
      {
        user_id,
        cohort_id,
        accepted_test,
        accepted_cohort,
      },
    );

    return res.json(updatedApplication);
  } catch (error) {
    next(error);
  }
};

const submitApplicationController = async (req, res, next) => {
  try {
    const applicationId = req.params.applicationId;
    const application = await Applications.getApplication(applicationId);
    if (!application.length) {
      throw new NotFoundError('application not found');
    }

    const { user_id, cohort_id } = application[0];
    const { user } = await Users.getUser(user_id);
    const cohort = await Cohorts.getCohort(cohort_id);

    // call email service
    logger.info(
      `About to invoke email service with: ${user.first_name}, ${
        user.last_name
      }, ${user.email}`,
    );
    await invokeEmailService({
      firstName: user.first_name,
      lastName: user.last_name,
      email: user.email,
    });

    // call slack service
    logger.info(
      `About to invoke slack service with: ${user.first_name}, ${
        cohort[0].name
      }`,
    );
    await invokeSlackService({
      applicantName: user.first_name,
      cohortName: cohort[0].name,
    });

    return res.json('Successfully submitted application');
  } catch (error) {
    next(error);
  }
};

module.exports = {
  listApplicationsController,
  getApplicationController,
  createApplicationController,
  updateApplicationController,
  submitApplicationController,
};
