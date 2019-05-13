const { validationResult } = require('express-validator/check');
const { NotFoundError } = require('../../utils/errors');

const Applications = require('./applications.model');

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

module.exports = {
  listApplicationsController,
  getApplicationController,
  createApplicationController,
  updateApplicationController,
};
